const conn = require('./conn');
const { STRING, UUID, UUIDV4, INTEGER } = conn.Sequelize;

const Coupon = conn.define('coupon', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  code: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  discount: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Coupon;