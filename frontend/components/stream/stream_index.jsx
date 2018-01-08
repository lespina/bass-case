import React from 'react';
import StreamIndexItem from './stream_index_item';

class StreamIndex extends React.Component {
  render() {
    if (this.props.songs.length > 0) {
      return (
        <ul className="stream-index">
          {
            this.props.songs.map((song, idx) => {
              const artist = this.props.users[song.artistId];
              return <StreamIndexItem key={idx} song={song} artist={artist}/>;
            }, this)
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default StreamIndex;
