import {
  RECEIVE_POSITION,
  PREVIOUS,
  RECEIVE_DURATION,
  TOGGLE_SHUFFLE,
  TOGGLE_LOOP,
  RECEIVE_VOLUME,
  RECEIVE_NEW_PLAYBACK_SONGS,
  RECEIVE_PLAYBACK_SONG,
  UPDATE_QUEUE,
  CLEAR_QUEUE,
  ADD_TO_NEXT_UP,
  NEXT
} from '../../actions/playback_actions';

import React from 'react';
import Sound from 'react-sound';

class Playback extends React.Component {
  constructor(props) {
    super(props);
    this.position = 0;
  }

  componentDidMount() {
    this.props.fetchSongs();
    this.props.fetchPlaybackSongs();
  }

  shouldComponentUpdate(nextProps) {
    const { lastAction } = nextProps.playback;
    switch (lastAction) {
      case RECEIVE_POSITION:
      case RECEIVE_DURATION:
      case RECEIVE_NEW_PLAYBACK_SONGS:
      case TOGGLE_SHUFFLE:
      case TOGGLE_LOOP:
      case UPDATE_QUEUE:
      case CLEAR_QUEUE:
      case ADD_TO_NEXT_UP:
        return false;
      default:
        return true;
    }
  }

  incrementPlays(songId) {
    const song = this.props.songs[songId];
    const newSong = Object.assign({}, song);
    newSong.plays += 1;
    this.props.updateSong(newSong);
  }

  componentDidUpdate(prevProps) {
    const prevSongQueue = prevProps.playback.songQueue;
    const prevSongIdx = prevProps.playback.songIdx;
    const prevSongId = prevSongQueue[prevSongIdx];

    const { songIdx, songQueue, lastAction } = this.props.playback;
    const currentSongId = songQueue[songIdx];

    if (lastAction === NEXT || lastAction === RECEIVE_PLAYBACK_SONG || prevSongId !== currentSongId) {
      this.incrementPlays(currentSongId);
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
        onFinishedPlaying: this.onFinishedPlaying.bind(this),
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
