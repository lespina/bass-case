import {
  RECEIVE_POSITION,
  PREVIOUS,
  RECEIVE_DURATION,
  TOGGLE_SHUFFLE,
  TOGGLE_LOOP,
  RECEIVE_VOLUME
} from '../../actions/playback_actions';

import React from 'react';
import Sound from 'react-sound';

class Playback extends React.Component {
  constructor(props) {
    super(props);

    this.position = 0;
  }

  componentDidMount() {
    this.props.fetchPlaybackSongs();
  }

  shouldComponentUpdate(nextProps) {
    const { lastAction } = nextProps.playback;
    switch (lastAction) {
      case RECEIVE_POSITION:
      case RECEIVE_DURATION:
      case TOGGLE_SHUFFLE:
      case TOGGLE_LOOP:
        return false;
      // case RECEIVE_VOLUME:
      //   this.props.seekTo(this.position + 350);
      //   return false;
      default:
        return true;
    }
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
  }

  onPlaying({ position }) {
    this.position = position;
    this.props.receivePosition(position);
  }

  onPause({ position }) {
    this.position = position;
    this.props.seekTo(position);
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
      position,
      loop,
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
          <Sound {...soundProps} ref={(s) => { this.sound = s; }} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Playback;
