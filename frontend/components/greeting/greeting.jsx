import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser !== null) {
    return (
      <div>
        Welcome, {currentUser.username}!
        <button onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Greeting;
