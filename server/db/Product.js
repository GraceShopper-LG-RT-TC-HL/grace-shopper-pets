const conn = require('./conn');
const { STRING, TEXT, UUID, UUIDV4 } = conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imgUrl: {
    type: TEXT,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
