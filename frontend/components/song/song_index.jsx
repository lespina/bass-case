import React from 'react';
import SongIndexItem from './song_index_item';
import shuffle from 'shuffle-array';

class SongIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTogglePlayback = this.handleTogglePlayback.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (Object.keys(nextProps.songs).join('') === Object.keys(this.props.songs).join('')) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.props.fetchSongs();
  }

  handleTogglePlayback(songId) {
    return (e) => {
      e.preventDefault();
      if (this.props.currentSongId != songId) {
        this.props.receivePlaybackSong(songId);
      } else {
        this.props.togglePlayback();
      }
    };
  }

  render() {
    return (
      <div className="song-index-container">
        <ul className="song-index">
          {
            shuffle(this.props.songs, { copy: true }).slice(0, 12).map((song, idx) => {
              return <SongIndexItem key={song.id} song={song} idx={idx} handleTogglePlayback={this.handleTogglePlayback(song.id)}/>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default SongIndex;
