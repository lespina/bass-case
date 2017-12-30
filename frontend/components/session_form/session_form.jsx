import React from 'react';
import { Redirect } from 'react-router-dom';

const USERNAME = "USERNAME";
const PASSWORD = "PASSWORD";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: USERNAME,
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { inputType } = this.state;

    if (inputType === USERNAME) {
      this.setState({ inputType: PASSWORD });
      return;
    }

    const { processForm, history } = this.props;
    const user = Object.assign({}, this.state);

    processForm({ user });
  }

  handleBack(e) {
    e.preventDefault();

    this.setState({ inputType: USERNAME });
  }

  handleChange(attrName) {
    return (e) => {
      this.setState({ [attrName]: e.target.value });
    };
  }

  errors() {
    const { errors } = this.props;

    if (errors.length > 0) {
      return (
        <ul>
          {
            errors.map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })
          }
        </ul>
      );
    } else {
      return;
    }
  }

  input() {
    const { inputType, username, password } = this.state;
    if (inputType === USERNAME) {
      return (
        <div>
          <label htmlFor="input-username">Username</label>
          <input onChange={this.handleChange('username')} id="input-username" type="text" value={username}/>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor="input-password">Password</label>
          <input onChange={this.handleChange('password')} id="input-password" type="password" value={password}/>
        </div>
      );
    }
  }

  back() {
    const { inputType } = this.state;
    if (inputType === USERNAME) {
      return;
    } else {
      return <button onClick={this.handleBack}>Back</button>;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.input()}
          <button>Continue</button>
        </form>
        {this.back()}
        {this.errors()}
      </div>
    );
  }
}

export default SessionForm;
