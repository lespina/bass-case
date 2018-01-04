import React from 'react';
import Sound from 'react-sound';

class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: null
    };
  }

  // componentShouldUpdate(nextProps) {
  //   //TODO: write this to keep the music from rerendering unnecessarily.
  //
  // }

  componentDidMount() {
    this.props.fetchPlaybackSongs();
  }

  handleSimpleAction(name) {
    return (e) => {
      e.preventDefault();
      this.props[name]();
    };
  }

  onLoading({ duration }) {
    this.setState({ duration });
  }

  // seekToNormalized(normalizedPosition) {
  //   const { duration, seekTo } = this.props;
  //   seekTo(normalizedPosition * duration / 100);
  // }

  onPause({ position }) {
    this.props.seekTo(position);
  }

  render() {
    const { songs, playback } = this.props;
    const {
      songQueue,
      songIdx,
      shuffle,
      loop,
      position,
      playing,
      volume,
    } = playback;

    const song = songs[playback.songQueue[songIdx]];

    if (song) {
      const soundProps = {
        url: song.audioUrl,
        playStatus: ((playing) ? Sound.status.PLAYING : Sound.status.PAUSED),
        playFromPosition: position || 0,
        volume: volume,
        autoLoad: true,
        onPause: this.onPause.bind(this),
        onLoading: this.onLoading.bind(this),
      };

      return (
        <div>
          <Sound {...soundProps}/>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default PlayBar;
