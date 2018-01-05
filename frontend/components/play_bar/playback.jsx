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
      default:
        return true;
    }
  }

  onLoading({ duration }) {
    this.props.receiveDuration(duration);
  }

  onPlaying({ position }) {
    this.position = position;
    this.props.receivePosition(position);
  }

  onPause({ position }) {
    this.props.seekTo(position);
  }

  onError({ errorCode, description }) {
    console.log(errorCode, description);
  }

  onFinishedPlaying() {
    this.props.next();
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
      mute,
    } = playback;

    const song = songs[playback.songQueue[songIdx]];

    if (song) {
      const soundProps = {
        url: song.audioUrl,
        playStatus: ((playing) ? Sound.status.PLAYING : Sound.status.PAUSED),
        playFromPosition: position,
        volume: ((mute) ? 0 : volume),
        autoLoad: true,
        onPause: this.onPause.bind(this),
        onPlaying: this.onPlaying.bind(this),
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

export default Playback;
