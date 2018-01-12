import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { fetchUser, updateUser } from '../../actions/user_actions';
import UserHeroImage from './user_hero_image';
import InfoBar from '../info_bar/info_bar';
import UserMainContent from './user_main_content';
import UserEditForm from './user_edit_form';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.fetched = false;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
    this.fetched = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchUser(nextProps.match.params.id);
    }
  }


  updateImage(type) {
    return (e) => {
      e.preventDefault();
      const file = e.currentTarget.files[0];
      const formData = new FormData();
      formData.append(`user[${type}_image]`, file);
      if (file) {
        this.props.updateUser(formData);
      }
    };
  }

  render() {
    const { user, currentUserId } = this.props;

    const tabs = [
      {text: 'All', pathname: '', userShow: true},
      // {text: 'Tracks', pathname: 'tracks', userShow: true},
      // {text: 'Albums', pathname: 'albums', userShow: true},
      // {text: 'Playlists', pathname: 'playlists', userShow: true},
      // {text: 'Reposts', pathname: 'reposts', userShow: true},
    ];

    if (!this.fetched) {
      return null;
    }

    return (
      <div>
        <UserHeroImage user={user} currentUserId={currentUserId} updateUser={this.props.updateUser} updateImage={this.updateImage.bind(this)}/>
        <Route render={() => {
          return <InfoBar tabs={tabs} user={user}/>;
        }}/>
        {/* <UserInfoBar user={user} currentUserId={currentUserId}/> */}
        <Route path={`/users/${user.id}/edit`} component={UserEditForm}/>
        <UserMainContent user={user} currentUserId={currentUserId}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.id;
  const currentUserId = ((state.session.currentUser) ? state.session.currentUser.id : null);

  return {
    currentUserId,
    user: state.entities.users[userId],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  updateUser: (formData) => dispatch(updateUser(ownProps.match.params.id, formData)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserShow)
);
