const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Coupon = require('./Coupon');
const { faker } = require('@faker-js/faker');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123', isAdmin: true }),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  const productsArr = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.name.firstName();
    const randomNumber = Math.floor(Math.random() * 1000);
    const imgUrl = `${faker.image.animals()}?random=${randomNumber}`;
    const price = faker.commerce.price(10, 1000);
    const description = faker.word.adjective();

    productsArr.push(Product.create({ name, imgUrl, price, description }));
  }

  const products = await Promise.all(productsArr);

  let cart = await ethyl.getCart();

  const lineItems = await Promise.all(
    products.map((product) => {
      return ethyl.addToCart({
        product,
        quantity: Math.floor(Math.random() * 10),
      });
    })
  );

  let order = ethyl.createOrder();
  cart = await ethyl.getCart();

  const lineItems2 = await Promise.all(
    products.map((product) => {
      return LineItem.create({
        productId: product.id,
        orderId: cart.id,
        quantity: Math.floor(Math.random() * 10) + 1,
      });
    })
  );

  order = ethyl.createOrder();

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
    products,
    cart,
    lineItems,
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
  Order,
  LineItem,
  Coupon,
};
