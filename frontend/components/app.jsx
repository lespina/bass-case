import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { fetchUsers } from '../actions/user_actions';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
import Landing from './landing_page/landing';
import Upload from './upload/upload';
import PlayBarContainer from './play_bar/play_bar_container';
import PlaybackContainer from './play_bar/playback_container';
import NavBar from './nav_bar/nav_bar';
import UserShow from './user_show_page/user_show';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    if (this.props.users === null) {
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
            <ProtectedRoute path="/users/:id" component={UserShow} onRootPage={this.props.onRootPage} />
            <ProtectedRoute path="/upload" component={Upload}/>
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
  onRootPage: state.session.onRootPage
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default withRouter(
    connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
