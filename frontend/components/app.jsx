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
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.toggleModalOpen = this.toggleModalOpen.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  toggleModalOpen() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    if (this.props.users === null) {
      return null;
    }

    return (
      <div>
        <Route path="/" component={NavBar} />
        <div className={"full-width" + ((this.state.modalOpen) ? " modal-open" : "")}>

          <AuthRoute path="/" component={Landing} toggleModalOpen={this.toggleModalOpen}/>
          <AuthRoute path="/login" component={SessionFormContainer} toggleModalOpen={this.toggleModalOpen}/>
          <AuthRoute path="/signup" component={SessionFormContainer} toggleModalOpen={this.toggleModalOpen}/>

          <Route path="/users/:id" component={UserShow} />
          <ProtectedRoute path="/upload" component={Upload}/>

          <PlayBarContainer/>
          <PlaybackContainer/>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.users
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
