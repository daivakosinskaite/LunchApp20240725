import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      onLogin(response.data.role);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="login">
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vartotojo vardas:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Slaptažodis:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Prisijungti</button>
      </form>
    </div>
  );
}

export default Login;