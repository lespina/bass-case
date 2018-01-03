import React from 'react';
import { Link } from 'react-router-dom';

const HeroImage = (props) => {
  return (
    <header className="hero">

        <section className="hero-image">
          <div className="hero-logo">
            <span className="hero-logo-image"></span>
            <span className="hero-logo-text">BASSCASE</span>
          </div>

          <div className="hero-session">
            <Link to="/login"><button className="hero-session-signin">Sign in</button></Link>
            <Link to="/signup"><button className="hero-session-signup">Create account</button></Link>
          </div>

          <div className="hero-content">
            <h1>Connect on BassCase</h1>
            <h3>
              Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.
            </h3>
            <Link to="/signup"><button className="hero-session-middle-signup">Sign up for free</button></Link>
          </div>
        </section>
      </header>
  );
};

export default HeroImage;
