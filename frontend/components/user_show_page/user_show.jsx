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

    if (!this.fetched) {
      return null;
    }

    return (
      <div>
        <UserHeroImage user={user} currentUserId={currentUserId} updateUser={this.props.updateUser} updateImage={this.updateImage.bind(this)}/>
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
