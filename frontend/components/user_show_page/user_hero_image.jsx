import React from 'react';

class UserHeroImage extends React.Component {

  constructor(props) {
    super(props);
  }

  location() {
    const { user } = this.props;
    if (user.location) {
      return <div className="user-header-details-location">{user.location}</div>;
    } else {
      return <div></div>;
    }
  }

  avatarChooser() {
    const { user, currentUserId } = this.props;
    const isCurrentUser = (user.id === parseInt(currentUserId));
    if (isCurrentUser) {
      return (
        <div className="image-button">
          <div className="image-chooser">
            <label className="image-chooser-btn bc-btn" htmlFor="image-chooser-input-2">Update image</label>
            <input id="image-chooser-input-2" onChange={this.props.updateImage("profile")} type="file"></input>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  bannerChooser() {
    const { user, currentUserId } = this.props;
    const isCurrentUser = (user.id === parseInt(currentUserId));

    if (isCurrentUser) {
      return (
        <div className="image-chooser banner-image-chooser">
          <label className="image-chooser-btn bc-btn" htmlFor="image-chooser-input-1">Update image</label>
          <input id="image-chooser-input-1" onChange={this.props.updateImage("banner")} type="file"></input>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const { user } = this.props;
    const avatarImg = { ["backgroundImage"]: `url(${user.avatarUrl})` };
    const bannerImg = { ["backgroundImage"]: `url(${user.bannerUrl})` };

    return (
      <section className="user-hero">
        <div className="user-header">
          <div className="user-banner-image" style={bannerImg}>
            {this.bannerChooser()}
          </div>
          <section className="user-header-details">
            <div className="user-header-details-avatar">
              <div className="user-header-details-avatar-image" style={avatarImg}>
                {this.avatarChooser()}
              </div>
              <div className="user-header-details-avatar-btn"></div>
            </div>
            <div className="user-header-details-content">
              <div className="user-header-details-username">{user.username}</div>
              {this.location()}
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default UserHeroImage;
