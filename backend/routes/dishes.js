const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', [auth, admin], async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const newDish = new Dish({ name, description, price, imageUrl, userId: req.user.userId });
    await newDish.save();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', [auth, admin], async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    let dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    dish.name = name || dish.name;
    dish.description = description || dish.description;
    dish.price = price || dish.price;
    dish.imageUrl = imageUrl || dish.imageUrl;

    await dish.save();
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/rate', auth, async (req, res) => {
  const { rating } = req.body;

  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    const existingRating = dish.ratings.find(r => r.userId.toString() === req.user.userId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      dish.ratings.push({ userId: req.user.userId, rating });
    }

    await dish.save();
    const averageRating = dish.calculateAverageRating();
    res.json({ ...dish.toObject(), averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    await dish.remove();
    res.json({ message: 'Dish deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
