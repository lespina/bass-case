import {
  RECEIVE_DURATION,
  TOGGLE_SHUFFLE,
  TOGGLE_LOOP,
  RECEIVE_VOLUME
} from '../../actions/playback_actions';

import React from 'react';
import Sound from 'react-sound';

class PlayBar extends React.Component {
  constructor(props) {
    super(props);

    this.playing = false;
    this.position = 0;
  }

  componentDidMount() {
    this.props.fetchPlaybackSongs();
  }

  shouldComponentUpdate(nextProps) {
    const { lastAction } = nextProps.playback;
    switch (lastAction) {
      case RECEIVE_DURATION:
        return false;
      case TOGGLE_SHUFFLE:
        return false;
      case TOGGLE_LOOP:
        return false;
      case RECEIVE_VOLUME:
        this.props.seekTo(this.position + 350);
        return false;
      default:
        return true;
    }
  }

  handleSimpleAction(name) {
    return (e) => {
      e.preventDefault();
      this.props[name]();
    };
  }

  onLoading({ duration }) {
    if (duration !== undefined && this.props.playback.duration === null) {
      this.props.receiveDuration(duration);
    }
  }

  // seekToNormalized(normalizedPosition) {
  //   const { duration, seekTo } = this.props;
  //   seekTo(normalizedPosition * duration / 100);
  // }

  onResume({ position }) {
    this.position = position;
    this.playing = true;
    console.log("I'm resuming!");
  }

  onPlaying({ position }) {
    this.position = position;
    this.playing = true;
  }

  onPause({ position }) {
    this.position = position;
    this.playing = false;
    console.log("I'm paused!");
  }

  onError({ errorCode, description }) {
    console.log(errorCode, description);
    this.setState(this.state);
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
        onPlaying: this.onPlaying.bind(this),
        onResume: this.onResume.bind(this),
        onLoading: this.onLoading.bind(this),
      };

      return (
        <div>
          <Sound {...soundProps} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default PlayBar;
