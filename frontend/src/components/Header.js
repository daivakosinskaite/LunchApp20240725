import React from 'react';

const Header = ({ user, setUser }) => {
  return (
    <header className="header">
      <h1>Daily lunch</h1>
      {user && (
        <>
          <button onClick={() => setUser(null)}>Logout</button>
          {user === 'admin' && (
            <button onClick={() => document.querySelector('.dish-upload').scrollIntoView()}>Add Dish</button>
          )}
        </>
      )}
    </header>
  );
}

export default Header;