import React from 'react';

const DishList = ({ user, dishes, setDishes }) => {
  const handleOrder = (dish) => {
    console.log('Ordered:', dish);
  };

  const handleUpdate = (dish) => {
    console.log('Update dish:', dish);
  };

  return (
    <div className="dish-list">
      <h2>Patiekalai</h2>
      <div className="card-container">
        {dishes.map(dish => (
          <div key={dish.id} className="card">
            <img src={dish.image} alt={dish.name} className="card-img" />
            <div className="card-body">
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p><strong>Kaina:</strong> {dish.price} €</p>
              {user === 'user' && <button onClick={() => handleOrder(dish)}>Order</button>}
              {user === 'admin' && <button onClick={() => handleUpdate(dish)}>Update</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishList;