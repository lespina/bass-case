import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import * as SessionActions from '../../actions/session_actions';

class NavBar extends React.Component {

  render() {
    const { currentUser, logout } = this.props;

    if (currentUser === null) { return <div></div>; }

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

              <section className="nav-middle">
                <form className="nav-search">
                  <input type="search" placeholder="Search"></input>
                  <button type="submit">Search</button>
                </form>
              </section>

              <section className="nav-right">
                <NavLink className="nav-upload hov-white" activeClassName="nav-selected" exact to="/upload">
                  Upload
                </NavLink>


                <div className="nav-user-menu">
                  <Link to={`/users/${currentUser.id}`} className="nav-user-button">
                    <div className="nav-user-image">
                      <span>Placeholder</span>
                    </div>
                    <div className="nav-user-username truncate">{currentUser.username}</div>
                  </Link>
                </div>

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
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(SessionActions.logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBar));
