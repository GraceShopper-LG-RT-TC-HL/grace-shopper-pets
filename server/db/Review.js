const conn = require('./conn');
const { STRING, TEXT, UUID, UUIDV4, INTEGER } = conn.Sequelize;

const Review = conn.define('review', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  title: {
    type: STRING,
  
  },
  content: {
    type: TEXT
  },
  userId: {
    type: UUID,
    allowNull: false
  },
  productId: {
    type: UUID,
    allowNull: false
  },
  rating: {
    type: INTEGER,
    allowNull: false
  }
});

module.exports = Review;