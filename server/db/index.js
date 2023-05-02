const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Coupon = require('./Coupon');
const { faker } = require('@faker-js/faker');
const Review = require('./Review');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Review.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(Product);
Product.hasMany(Review);

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

  let lineItems = await Promise.all(
    products.map((product) => {
      return ethyl.addToCart({
        product,
        quantity: Math.floor(Math.random() * 10),
      });
    })
  );

  let order = await ethyl.createOrder();
  //let order = await Order.create({ userId: ethyl.id, isCart: false});

  cart = await ethyl.getCart();

  /*
  lineItems = await Promise.all(
    products.map((product) => {
      return LineItem.create({
        productId: product.id,
        orderId: cart.id, 
        quantity: Math.floor(Math.random() * 10) + 1,
      });
    })
  );
  */
  lineItems = await Promise.all(
    products.map((product) => {
      return ethyl.addToCart({
        product,
        quantity: Math.floor(Math.random() * 10),
      });
    })
  );

  order = await ethyl.createOrder();

  Review.create({ userId: ethyl.id, productId: products[0].id, rating: 5, title: 'awesome!', content: `love my new ${products[0].name}!`});
  Review.create({ userId: lucy.id, productId: products[0].id, rating: 3, title: 'meh', content: `${products[0].name} is ok. could be better.`})
  Review.create({ userId: larry.id, productId: products[0].id, rating: 4, title: 'pretty gnarly', content: `this ${products[0].name} is pretty gnarly. i like it.`})
  
  Review.create({ userId: ethyl.id, productId: products[1].id, rating: 5, title: 'superb!', content: `love my wonderful ${products[1].name}!`});
  
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
  Review
};
