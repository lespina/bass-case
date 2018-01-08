import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import StreamIndex from '../stream/stream_index';

class UserStream extends React.Component {
  render() {
    return (
      <main className="user-main border-right-light">
        <div className="user-main-stream">
          <StreamIndex songs={this.props.songs} users={this.props.users}/>
          <div className="user-main-stream-loading"></div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const allSongs = state.entities.songs;
  const songIds = ownProps.user.songIds;
  const songs = _.values(allSongs).filter(song => {
    return songIds.includes(song.id);
  });

  return {
    songs,
    users: state.entities.users,
  };
};

export default connect(
  mapStateToProps,
  null
)(UserStream);
