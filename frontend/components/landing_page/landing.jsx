import React from 'react';
import HeroImage from './hero_image';
import SongIndexContainer from '../song/song_index_container';

const Landing = (props) => {
  return (
    <div>
      <HeroImage />
      <section class="trending-songs">
        <div class="trending-songs-title">
          Hear what’s trending for free in the BassCase community
        </div>
        <SongIndexContainer />
      </section>
    </div>
  );
};

export default Landing;
