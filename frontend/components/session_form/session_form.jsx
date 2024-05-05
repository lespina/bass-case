import _ from 'lodash';
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
      password: "",
      classList: [],
      show: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSignIn = this.handleDemoSignIn.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEscCancel = this.handleEscCancel.bind(this);
  }

  componentDidMount() {
    this.props.clearSessionErrors();

    document.body.classList.toggle('modal-open');

    let { classList: origClassList } = _.merge({}, this.state);

    const classList = origClassList.concat(["session-form-enter"]);
    const show = true;
    this.setState({ show, classList });

    window.setTimeout(() => {
      this.setState({ classList: origClassList });
    }, 585);
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();

    document.body.classList.toggle('modal-open');
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.clearSessionErrors();

    const { inputType } = this.state;

    if (inputType === USERNAME) {
      this.setState({ inputType: PASSWORD });
      return;
    }

    const { processForm } = this.props;
    const user = Object.assign({}, this.state);

    processForm({ user });
  }

  handleDemoSignIn(e) {
    e.preventDefault();
    const user = {
      username: "guest",
      password: "password",
    };
    this.props.processForm({ user });
  }

  handleCancel() {
    let { classList: origClassList } = _.merge({}, this.state);

    const classList = origClassList.concat(["session-form-exit"]);
    const show = false;
    this.setState({ classList, show });

    window.setTimeout(() => {
      this.setState({ classList: origClassList });
      this.props.history.push('/');
    }, 500);
  }

  handleEscCancel(e) {
    e.preventDefault();

    if (e.keyCode === 27) {
      this.handleCancel();
    }
  }

  handleBack(e) {
    e.preventDefault();

    this.props.clearSessionErrors();

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
        <ul className="session-form-errors">
          {
            errors.map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })
          }
        </ul>
      );
    } else {
      return null;
    }
  }

  input() {
    const { inputType, username, password } = this.state;
    const { errors } = this.props;

    const errorsExist = (errors.length > 0) ? true : false;

    if (inputType === USERNAME) {
      return (
        <div>
          <input className={(errorsExist) ? "orange-input" : ""} autoFocus onKeyUp={this.handleEscCancel} onChange={this.handleChange('username')} type="text" value={username} placeholder="Your username *"/>
        </div>
      );
    } else {
      return (
        <div>
          <div className="relative">
            <input className="session-form-locked-username" type="text" placeholder={username} disabled/>
            <button type="button" className="session-form-back-button" onClick={this.handleBack}>Back</button>
          </div>
          <input className={(errorsExist) ? "orange-input" : ""} autoFocus onKeyUp={this.handleEscCancel} onChange={this.handleChange('password')} id="input-password" type="password" value={password} placeholder="Your password *"/>
        </div>
      );
    }
  }

  formText() {
    return (
      <div>
        <p className="session-form-text-email">
          We may use your email for updates and tips on BassCase's products and services. You can unsubscribe for free at any time in your notification preferences.
        </p>
        <p className="session-form-text-agree">
          By signing in, you agree to have a great time.
        </p>
      </div>
    );
  }

  demoSignIn() {
    if (this.state.inputType === USERNAME && this.props.formType === 'login') {
      return (
        <button className="session-form-demo-submit" onClick={this.handleDemoSignIn} type="button">Log in as Guest</button>
      );
    } else {
      return (
        <div>
          <div className="transparent">Flex Filler</div>
          <div className="transparent">Flex Filler</div>
        </div>
      );
    }
  }

  render() {
    const { classList, show, inputType } = this.state;
    return (
      <section className={`modal ${(show) ? "show" : ""}`}>
        <div onClick={this.handleCancel} className="modal show cancel-background">
          <button className="modal-close-button"></button>
        </div>

        <form className={`session-form ${classList.join(' ')}`} onSubmit={this.handleSubmit}>
          {this.input()}
          {this.errors()}
          <button type="submit">Continue</button>
          {(inputType === USERNAME) ? this.formText() : ""}
          {this.demoSignIn()}
        </form>
      </section>
    );
  }
}

export default SessionForm;
