import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser !== null) {
    return (
      <div>
        Welcome, {currentUser.username}!
        <br />
        <button type="button" onClick={logout}>Log Out</button>
        <br />
        <Link to="/upload">Upload a song</Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Greeting;
