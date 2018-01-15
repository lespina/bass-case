import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props);

    const { user } = this.props;
    this.state = {
      isSaving: false,
      classList: [],
      username: user.username,
      bio: user.bio || "",
      location: user.location || "",
      imageUrl: user.avatarUrl,
      avatarImage: null,
      show: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEscCancel = this.handleEscCancel.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle('modal-open');

    let { classList: origClassList } = _.merge({}, this.state);

    const classList = origClassList.concat(["user-edit-form-enter"]);
    const show = true;
    this.setState({ show, classList });

    window.setTimeout(() => {
      this.setState({ classList: origClassList });
    }, 585);
  }

  componentWillUnmount() {
    document.body.classList.toggle('modal-open');
  }

  handleCancel() {
    let { classList: origClassList } = _.merge({}, this.state);

    const classList = origClassList.concat(["user-edit-form-exit"]);
    const show = false;
    this.setState({ classList, show });

    window.setTimeout(() => {
      this.setState({ classList: origClassList });
      this.props.history.push(`/users/${this.props.user.id}`);
    }, 500);
  }

  handleEscCancel(e) {
    e.preventDefault();

    if (e.keyCode === 27) {
      this.handleCancel();
    }
  }

  handleChange(attrName) {
    return (e) => {
      this.setState({ [attrName]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true });

    const formData = new FormData();
    formData.append("user[username]", this.state.username);
    formData.append("user[bio]", this.state.bio);
    formData.append("user[location]", this.state.location);
    if (this.state.avatarImage) {
      formData.append("user[profile_image]", this.state.avatarImage);
    }

    this.props.updateUser(this.props.user.id, formData).then((user) => {
      this.handleCancel();
      this.setState({ isSaving: false });
      return user;
    }, errors => {
      console.log(errors);
      this.setState({ isSaving: false });
    });
  }

  updateImage(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    let fileReader;

    if (file.type.slice(0, 5) === "image") {
      fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({ imageUrl: fileReader.result });
      };

      fileReader.readAsDataURL(file);
    }

    this.setState({ avatarImage: file });
  }

  avatarChooser() {
    return (
      <div className="image-button">
        <div className="image-chooser">
          <label className="image-chooser-btn bc-btn" htmlFor="image-chooser-input-3">Update image</label>
          <input id="image-chooser-input-3" onChange={this.updateImage} type="file"></input>
        </div>
      </div>
    );
  }

  inputs() {
    const { username, bio, location, isSaving } = this.state;
    const disabled = ((isSaving) ? { disabled: "disabled" } : {});

    return (
      <div className="user-edit-form-base-inputs">
        <div className="user-edit-form-username">
          <label htmlFor="user-edit-username" className="user-edit-form-username-label">Username</label>
          <input onKeyUp={this.handelEscCancel} onChange={this.handleChange('username')} value={username} {...disabled} className="user-edit-form-username-input" type="text" id="user-edit-username"></input>
        </div>
        <div className="user-edit-form-location">
          <label htmlFor="user-edit-location" className="user-edit-form-location-label">Location</label>
          <input onKeyUp={this.handelEscCancel} onChange={this.handleChange('location')} value={location} {...disabled} className="user-edit-form-location-input" type="text" id="user-edit-location"></input>
        </div>
        <div className="user-edit-form-bio">
          <label htmlFor="user-edit-bio" className="user-edit-form-bio-label">Bio</label>
          <textarea onKeyUp={this.handelEscCancel} onChange={this.handleChange('bio')} value={bio} {...disabled} className="user-edit-form-bio-input" type="text" id="user-edit-bio"></textarea>
        </div>
      </div>
    );
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

  render() {
    const { classList, show } = this.state;
    const avatarImg = { "backgroundImage": `url(${this.state.imageUrl})` };

    return (
      <section className={`modal ${(show) ? "show" : ""}`}>
        <div onClick={this.handleCancel} className="modal show cancel-background">
          <button className="modal-close-button"></button>
        </div>

        <form className={`session-form user-edit-form ${classList.join(' ')}`} onSubmit={this.handleSubmit}>
          <div className="user-edit-form-content">
            <h2 className="user-edit-form-title truncate">Edit your Profile</h2>
            <div className="user-edit-form-settings">
              <div className="user-header-details-avatar-image user-edit-image" style={avatarImg}>
                {this.avatarChooser()}
              </div>
              {this.inputs()}
              {this.errors()}
            </div>
          </div>
          <div className="user-edit-form-partition"></div>
          <div className="user-edit-form-buttons">
            <button className="bc-btn user-edit-form-cancel-btn" onClick={this.handleCancel} type="button" name="button">Cancel</button>
            <button className="bc-btn user-edit-form-save-btn" type="submit">Save</button>
          </div>
        </form>


      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser.id],
  errors: state.errors.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (userId, formData) => dispatch(updateUser(userId, formData))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserEditForm)
);
