const express = require('express');
const app = express.Router();
const { Product, Review } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id/reviews', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.getReviews());
    // const review = await Review.findAll({
    //   where: {
    //     productId: product.id
    //   }
    // });
    // res.send(review);
  } catch (ex) {
    next(ex);
  }
});

app.post('/:id/reviews', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const review = await Review.create(req.body);
    //res.status(201).send(await product.addReview(req.body));
    res.status(201).send(await product.addReview(review));
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id/reviews/:reviewId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const review = await product.getReviews({
      where: {
        id: req.params.reviewId,
      },
    });
    await review[0].destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id/reviews/:reviewId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const review = await product.getReviews({
      where: {
        id: req.params.reviewId,
      },
    });
    res.send(await review[0].update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id/reviews/:reviewId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const review = await product.getReviews({
      where: {
        id: req.params.reviewId,
      },
    });
    res.send(review[0]);
  } catch (ex) {
    next(ex);
  }
});
