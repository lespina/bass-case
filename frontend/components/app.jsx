import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.toggleModalOpen = this.toggleModalOpen.bind(this);
  }

  toggleModalOpen() {
    this.setState({ modalOpen: !!this.state.modalOpen });
  }

  render() {
    return (
      <div className={(this.state.modalOpen) ? "modal-open" : ""}>
        <h1>BaseCase</h1>
        <GreetingContainer />
        <AuthRoute path="/login" component={SessionFormContainer} toggleModalOpen={this.toggleModalOpen}/>
        <AuthRoute path="/signup" component={SessionFormContainer} toggleModalOpen={this.toggleModalOpen} />
      </div>
    );
  }
}
export default App;
