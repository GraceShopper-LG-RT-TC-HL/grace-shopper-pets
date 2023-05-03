const express = require('express');
const app = express.Router();

const { User, Order, LineItem, Product } = require('../db');

module.exports = app;

app.post('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.get('/cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post('/cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post('/from_local_cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log(req.body);
    res.send(await user.addFromGuestCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/cart/update', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.updateCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const orders = await Order.findAll({
      where: {
        userId: user.id,
        isCart: false,
      },
      include: {
        model: LineItem,
      },
    });
    res.send(orders);
  } catch (ex) {
    next(ex);
  }
});
