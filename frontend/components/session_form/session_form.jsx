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
        <input onChange={this.handleChange('username')} id="input-username" type="text" value={username} placeholder="Your username *"/>
      );
    } else {
      return (
        <input onChange={this.handleChange('password')} id="input-password" type="password" value={password} placeholder="Your password *"/>
      );
    }
  }

  back() {
    const { inputType } = this.state;
    if (inputType === USERNAME) {
      return;
    } else {
      return <button className="session-form-back-button" onClick={this.handleBack}>Back</button>;
    }
  }

  render() {
    return (
      <section className="modal show">
        <button className="modal-close-button"></button>

        <div className="session-form-container">
          <form className="session-form" onSubmit={this.handleSubmit}>
            {this.input()}
            <button type="submit">Continue</button>
            <p className="session-form-text-email">
              We may use your email for updates and tips on BassCase's products and services. You can unsubscribe for free at any time in your notification preferences.
            </p>
            <p className="session-form-text-agree">
              By signing in, you agree to have a great time.
            </p>
          </form>
          {this.back()}
          {this.errors()}
        </div>
      </section>
    );
  }
}

export default SessionForm;
