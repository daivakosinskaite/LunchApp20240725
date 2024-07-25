const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true }
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  ratings: [ratingSchema], 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


dishSchema.methods.calculateAverageRating = function() {
  try {
    const totalRatings = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return this.ratings.length ? totalRatings / this.ratings.length : 0;
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return 0;
  }
};

module.exports = mongoose.model('Dish', dishSchema);
