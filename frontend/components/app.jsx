import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { fetchUsers } from '../actions/user_actions';
import { fetchSongs } from '../actions/song_actions';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
import Landing from './landing_page/landing';
import Upload from './upload/upload';
import PlayBarContainer from './play_bar/play_bar_container';
import PlaybackContainer from './play_bar/playback_container';
import NavBar from './nav_bar/nav_bar';
import UserShow from './user_show_page/user_show';
import StreamShowContainer from './stream_show_page/stream_show_container';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchSongs();
  }

  render() {
    if (Object.keys(this.props.users).length === 0) {
      return null;
    }

    return (
      <div>
        <Route path="/" component={NavBar} />
        <div className="full-width">

          <AuthRoute path="/" component={Landing}/>
          <AuthRoute path="/login" component={SessionFormContainer}/>
          <AuthRoute path="/signup" component={SessionFormContainer}/>

          <Switch>
            <ProtectedRoute path="/upload" component={Upload}/>
            <ProtectedRoute path="/users/:id" component={UserShow} onRootPage={this.props.onRootPage} />
            <ProtectedRoute path="/" component={StreamShowContainer}/>
          </Switch>

          <PlayBarContainer/>
          <PlaybackContainer/>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.users,
  songs: state.entities.songs,
  onRootPage: state.session.onRootPage
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchSongs: () => dispatch(fetchSongs()),
});

export default withRouter(
    connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
