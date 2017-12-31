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
    this.handleBack = this.handleBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.updateAppClass("modal-open");

    let { classList: origClassList } = _.merge({}, this.state);

    const classList = origClassList.concat(["session-form-enter"]);
    const show = true;
    this.setState({ classList, show });

    window.setTimeout(() => {
      this.setState({ classList: origClassList });
    }, 685);
  }

  componentWillUnMount() {
    this.props.updateAppClass("");
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

  handleCancel(e) {
    e.preventDefault();


    let { classList: origClassList } = _.merge({}, this.state);

    const sessionForm = document.querySelector(".session-form");

    if (!sessionForm.contains(e.target)) {
      this.props.updateAppClass("");
      const classList = origClassList.concat(["session-form-exit"]);
      const show = false;
      this.setState({ classList, show });

      window.setTimeout(() => {
        this.setState({ classList: origClassList });
        this.props.history.push('/');
      }, 1000);
    } else {
      e.stopPropagation();
    }
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
        <input autoFocus onChange={this.handleChange('username')} id="input-username" type="text" value={username} placeholder="Your username *"/>
      );
    } else {
      return (
        <input autoFocus onChange={this.handleChange('password')} id="input-password" type="password" value={password} placeholder="Your password *"/>
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
    const { classList, show } = this.state;
    return (
      <div>
        <section className={`modal ${(show) ? "show" : ""}`}>
          <div onClick={this.handleCancel} className="modal show cancel-background">
            <button className="modal-close-button"></button>
          </div>


          <div className="session-form-container">
            <form className={`session-form ${classList.join(' ')}`} onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}

export default SessionForm;
