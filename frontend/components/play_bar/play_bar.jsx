import React from 'react';
import Sound from 'react-sound';

class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: null
    };
  }

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

  seekToNormalized(normalizedPosition) {
    const { duration, seekTo } = this.props;
    seekTo(normalizedPosition * duration / 100);
  }

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

    const song = songs[playback.songQueue[0]];
    const soundProps = {};
    if (song) {
      soundProps.url = songs[playback.songQueue[songIdx]].audioUrl;
      soundProps.playStatus = ((playing) ? Sound.status.PLAYING : Sound.status.PAUSED);
      soundProps.playFromPosition = position || 0;
      soundProps.volume = volume;
      soundProps.autoLoad = true;
      soundProps.onPause = this.onPause.bind(this);
      soundProps.onLoading = this.onLoading.bind(this);
    }
    return (
      <div>
        <Sound {...soundProps}/>
      </div>
    );
  }
}

export default PlayBar;
