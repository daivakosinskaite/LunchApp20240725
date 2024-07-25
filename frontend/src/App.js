import React, { useState, useEffect } from 'react';
import './App.css';
import './main.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import DishUpload from './components/DishUpload';
import DishList from './components/DishList';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null); // null, 'user', 'admin'
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await axios.get('http://localhost:5000/api/dishes');
      setDishes(response.data);
    };
    fetchDishes();
  }, []);

  const handleLogin = (role) => {
    setUser(role);
  };

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      {!user ? (
        <>
          <Login onLogin={handleLogin} />
          <Register />
        </>
      ) : (
        <>
          {user === 'admin' && <DishUpload setDishes={setDishes} />}
          <DishList user={user} dishes={dishes} setDishes={setDishes} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;