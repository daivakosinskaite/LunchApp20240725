import React, { useState } from 'react';
import axios from 'axios';

const DishUpload = ({ setDishes }) => {
  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishImage, setDishImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDish = { name: dishName, description: dishDescription, price: parseFloat(dishPrice), image: dishImage };
    try {
      const response = await axios.post('http://localhost:5000/api/dishes', newDish);
      setDishes(prevDishes => [...prevDishes, response.data]);
      setDishName('');
      setDishDescription('');
      setDishPrice('');
      setDishImage('');
    } catch (error) {
      console.error('Error uploading dish', error);
    }
  };

  return (
    <div className="dish-upload">
      <h2>Įkelti Patiekalą</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patiekalo pavadinimas:</label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Patiekalo aprašymas:</label>
          <textarea
            value={dishDescription}
            onChange={(e) => setDishDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kaina:</label>
          <input
            type="number"
            value={dishPrice}
            onChange={(e) => setDishPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nuotraukos URL:</label>
          <input
            type="text"
            value={dishImage}
            onChange={(e) => setDishImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Įkelti</button>
      </form>
    </div>
  );
}

export default DishUpload;