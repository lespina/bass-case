import React from 'react';
import { Redirect } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { processForm, history } = this.props;
    const user = Object.assign({}, this.state);

    processForm({ user });
  }

  handleChange(attrName) {
    return (e) => {
      this.setState({ [attrName]: e.target.value });
    };
  }

  render() {
    const { loggedIn, errors} = this.props;

    if (loggedIn) {
      return <Redirect to="/"/>;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="input-username">Username</label>
          <input onChange={this.handleChange('username')} id="input-username" type="text" />
          <label htmlFor="input-password">Password</label>
          <input onChange={this.handleChange('password')} id="input-password" type="password" />
          <button>Continue</button>
        </form>

        <ul>
          {
            errors.map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default SessionForm;
