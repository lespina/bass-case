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
          <label className="image-chooser-btn bc-btn" htmlFor="image-chooser-input-1">Update image</label>
          <input id="image-chooser-input-1" onChange={this.updateImage} type="file"></input>
        </div>
      </div>
    );
  }

  input() {
    const { username, bio, location, isSaving } = this.state;
    const disabled = ((isSaving) ? { disabled: "disabled" } : {});

    return (
      <div className="user-edit-form-inputs">
        <div className="user-edit-username">
          <label className="user-edit-form-label" htmlFor={`user-edit-form-username`}>Username</label>
          <input onKeyUp={this.handelEscCancel} onChange={this.handleChange('username')} id={`user-edit-form-username`} className="user-edit-input-username" type="text" value={username} {...disabled}></input>
        </div>
        <div className="user-edit-location">
          <label className="user-edit-form-label" htmlFor={`user-edit-form-location`}>Location</label>
          <input onKeyUp={this.handelEscCancel} onChange={this.handleChange('location')} id={`user-edit-form-location`} className="user-edit-input-location" type="text" value={location} {...disabled}></input>
        </div>
        <div className="user-edit-bio">
          <label className="user-edit-form-label" htmlFor={`user-edit-form-bio`}>Bio</label>
          <textarea onKeyUp={this.handelEscCancel} onChange={this.handleChange('bio')} id={`user-edit-form-bio`} className="user-edit-input-bio" type="text" value={bio} {...disabled}></textarea>
        </div>
      </div>
    );
  }

  errors() {
    return <div></div>;
  }

  render() {
    const { classList, show } = this.state;
    const avatarImg = { "backgroundImage": `url(${this.state.imageUrl})` };

    return (
      <section className={`modal ${(show) ? "show" : ""}`}>
        <div onClick={this.handleCancel} className="modal show cancel-background">
          <button className="modal-close-button"></button>
        </div>

        <form className={`user-edit-form ${classList.join(' ')}`} onSubmit={this.handleSubmit}>
          <div className="user-header-details-avatar-image user-edit-image" style={avatarImg}>
            {this.avatarChooser()}
          </div>
          {this.input()}
          {this.errors()}
          <div className="user-edit-form-buttons">
            <button className="bc-btn user-edit-cancel" onClick={this.handleCancel} type="button">Cancel</button>
            <button className="bc-btn" type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser.id]
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
