import React from 'react';

const StreamHeroImage = (props) => {
  const { currentUser } = props;
  const avatarImg = { ["backgroundImage"]: `url(${currentUser.avatarUrl})` };
  const bannerImg = { ["backgroundImage"]: `url(${currentUser.bannerUrl})` };

  return (
    <section className="user-hero">
      <div className="user-header">
        <div className="user-banner-image" style={bannerImg}>
        </div>
        <section className="user-header-details">
          <div className="user-header-details-avatar">
            <div className="user-header-details-avatar-image" style={avatarImg}>
            </div>
            <div className="user-header-details-avatar-btn"></div>
          </div>
          <div className="user-header-details-content">
            <div className="user-header-details-username">{currentUser.username}</div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default StreamHeroImage;
