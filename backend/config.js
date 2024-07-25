require('dotenv').config();

module.exports = {
  db: {
    uri: process.env.MONGO_URI
  },
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET
};
