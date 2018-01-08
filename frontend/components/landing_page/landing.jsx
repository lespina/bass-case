import React from 'react';
import LandingHeroImage from './landing_hero_image';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SongIndexContainer from '../song/song_index_container';
import { toggleOnRootPage } from '../../actions/session_actions';

class Landing extends React.Component {
  componentDidMount() {
    this.props.toggleOnRootPage();
  }

  componentWillUnmount() {
    this.props.toggleOnRootPage();
  }

  render() {
    const path = this.props.location.pathname;
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleOnRootPage: () => dispatch(toggleOnRootPage()),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Landing)
);
