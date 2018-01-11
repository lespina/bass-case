import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import * as SessionActions from '../../actions/session_actions';
import { fetchUser } from '../../actions/user_actions';
import SearchFormContainer from '../search_form/search_form_container';

class NavBar extends React.Component {

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchUser(this.props.currentUser.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentUser && Boolean(nextProps.currentUser)) {
      this.props.fetchUser(nextProps.currentUser.id);
    }
  }

  render() {
    const { currentUser, logout, avatarUrl } = this.props;

    if (currentUser === null) { return <div></div>; }

    const avatarImg = ((avatarUrl) ? { backgroundImage: `url(${avatarUrl})` } : {});

    return (
      <div>
        <div className="bottom-filler"/>
        <nav className="nav">
            <div className="inner-nav full-width transparent-background no-height">
              <section className="nav-left">
                <Link to="/" className="nav-logo">BassCase</Link>
                <NavLink className="nav-home" activeClassName="nav-selected" exact to="/">
                  Home
                </NavLink>
                <NavLink className="nav-collection" activeClassName="nav-selected" exact to="/collection">
                  Collection
                </NavLink>
              </section>

              {/* <section className="nav-middle">
                <form className="nav-search">
                  <input type="search" placeholder="Search"></input>
                  <button type="submit">Search</button>
                </form>
              </section> */}
              <SearchFormContainer/>

              <section className="nav-right">
                <NavLink className="nav-upload hov-white" activeClassName="nav-selected" exact to="/upload">
                  Upload
                </NavLink>


                <Link to={`/users/${currentUser.id}`} className="nav-user-menu">
                  <div className="nav-user-button">
                      <div className="nav-user-image">
                        <span style={avatarImg}>Placeholder</span>
                      </div>
                      <div className="nav-user-username truncate">{currentUser.username}</div>
                  </div>
                </Link>

                <div onClick={logout} className="nav-sign-out">Sign Out</div>
                {/* <a href="#" className="nav-notifications">Notifications</a>
                <a href="#" className="nav-messages">Messages</a>
                <ul className="nav-menu">NavMenu</ul> */}
              </section>
            </div>
          </nav>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const avatarUrl = (currentUser ? state.entities.users[currentUser.id].avatarUrl : null);

  return {
    currentUser,
    avatarUrl
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(SessionActions.logout()),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBar));
