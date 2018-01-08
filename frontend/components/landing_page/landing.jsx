import React from 'react';
import LandingHeroImage from './landing_hero_image';
import { withRouter } from 'react-router-dom';
import SongIndexContainer from '../song/song_index_container';

const Landing = (props) => {
  const path = props.location.pathname;
  if (path === "/" || path === "/login" || path === "/signup") {
    return (
      <div>
        <LandingHeroImage />
        <section className="trending-songs">
          <div className="trending-songs-title">
            Hear what’s trending for free in the BassCase community
          </div>
          <SongIndexContainer />
        </section>
      </div>
    );
  } else {
    return null;
  }
};

export default withRouter(Landing);
