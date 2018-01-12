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
      this.forceUpdate();
    };
  }

  updateMoreActions(idx) {
    return (e) => {
      e.preventDefault();
      if (parseInt(this.props.moreActionsIdx) === idx) {
        this.props.receiveMoreActionsIndex(null);
      } else {
        this.props.receiveMoreActionsIndex(idx);
      }
    };
  }

  render() {

    return (
      <div className="song-index-container">
        <ul className="song-index">
          {
            shuffle(this.props.songs).slice(0, 12).map((song, idx) => {
              const { currentSongId, playing, users, history, addToNextUp } = this.props;
              const artist = users[song.artistId];

              let paused;
              if (song.id !== parseInt(currentSongId) || !playing) {
                paused = "";
              } else if (song.id === parseInt(currentSongId) && playing) {
                paused ="play-button-paused";
              }
              let open;
              if (parseInt(this.props.moreActionsIdx) !== idx) {
                open = "";
              } else {
                open = "open";
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
                open={open}
                updateMoreActions={this.updateMoreActions(idx)}
                addToNextUp={addToNextUp.bind(null, song.id)}
              />;
            }, this)
          }
        </ul>
      </div>
    );
  }
}


export default SongIndex;
