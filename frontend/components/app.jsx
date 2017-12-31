import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ""
    };

    this.updateAppClass = this.updateAppClass.bind(this);
  }

  updateAppClass(classes) {
    this.setState({ classes });
  }


  render() {
    return (
      <div className={this.state.classes}>
        <h1>BaseCase</h1>
        <GreetingContainer />
        <AuthRoute path="/login" component={SessionFormContainer} updateAppClass={this.updateAppClass}/>
        <AuthRoute path="/signup" component={SessionFormContainer} updateAppClass={this.updateAppClass} />
      </div>
    );
  }
}
export default App;
