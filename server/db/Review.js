const conn = require('./conn');
const { STRING, TEXT, UUID, UUIDV4, INTEGER, FLOAT } = conn.Sequelize;

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
  //  defaultValue: UUIDV4,
    allowNull: false
  },
  productId: {
    type: UUID,
  //  defaultValue: UUIDV4,
    allowNull: false
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    //defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  }
});

module.exports = Review;