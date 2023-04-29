const express = require('express');
const app = express.Router();

const { Coupon } = require('../db');

app.get('/', async (req, res, next) => {
  try {
    res.send(await Coupon.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Coupon.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    await coupon.update(req.body);
    res.send(coupon);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    await coupon.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
