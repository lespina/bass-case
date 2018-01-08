import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser, updateUser } from '../../actions/user_actions';
import UserHeroImage from './user_hero_image';
import UserInfoBar from './user_info_bar';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.fetched = false;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
    this.fetched = true;
  }

  render() {
    const { user, currentUserId } = this.props;

    if (!this.fetched) {
      return null;
    }

    return (
      <div>
        <UserHeroImage user={user} currentUserId={currentUserId}/>
        <UserInfoBar user={user} currentUserId={currentUserId}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.id;
  return {
    currentUserId: state.session.currentUser.id,
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
