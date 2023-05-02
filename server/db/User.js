const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BOOLEAN } = require('sequelize');
const JWT = process.env.JWT;

const default_avatar =
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png';

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imgUrl: {
    type: TEXT,
    defaultValue: default_avatar,

    validate: {
      notEmpty: true,
    },
  },
  shipAddress: {
    type: STRING,

    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  await cart.save();
  return cart;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id,
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  return cart;
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.addFromGuestCart = async function ({ lines }) {
  const cart = await this.getCart();
  for (let i = 0; i < lines.length; i++) {
    let lineItem = cart.lineItems.find((lineItem) => {
      return lineItem.productId === lines[i].product.id;
    });
    if (lineItem) {
      lineItem.quantity += lines[i].quantity;
      await lineItem.save();
    } else {
      await conn.models.lineItem.create({
        orderId: cart.id,
        productId: lines[i].product.id,
        quantity: lines[i].quantity,
      });
    }
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.prototype.updateCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  lineItem.quantity = quantity;
  await lineItem.save();
  return this.getCart();
};

User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.addHook('beforeValidate', (user) => {
  if (user.shipAddress === '') {
    user.shipAddress = null;
  }
  if (user.imgUrl === '') {
    user.imgUrl = null;
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  } catch (ex) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
};

module.exports = User;
