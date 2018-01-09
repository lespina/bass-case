import React from 'react';
import SongIndexItem from './song_index_item';

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
      this.forceUpdate();
    };
  }

  render() {

    return (
      <div className="song-index-container">
        <ul className="song-index">
          {
            this.props.songs.slice(0, 12).map((song, idx) => {
              const { currentSongId, playing, users, history } = this.props;
              const artist = users[song.artistId];

              let paused;
              if (song.id !== parseInt(currentSongId) || !playing) {
                paused = "";
              } else if (song.id === parseInt(currentSongId) && playing) {
                paused ="play-button-paused";
              }

              return <SongIndexItem
                key={song.id}
                song={song}
                idx={idx}
                handleTogglePlayback={this.handleTogglePlayback(song.id)}
                paused={paused}
                playing={playing}
                artist={artist}
                history={history}
              />;
            }, this)
          }
        </ul>
      </div>
    );
  }
}

export default SongIndex;
