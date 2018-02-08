import React from 'react';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import { LOOP_ALL, LOOP_ONE } from '../../reducers/playback_reducer';
import {
  RECEIVE_PLAYBACK_SONG,
  RECEIVE_PLAYBACK_SONG_FROM_QUEUE,
  PREVIOUS, NEXT, RECEIVE_POSITION,
  TOGGLE_PLAYBACK, SEEK
} from '../../actions/playback_actions';
import PlayBarQueueContainer from './sortable_play_bar_queue_container';
import LikeToggle from '../like_toggle/like_toggle_container';

class PlayBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start: new Date(0),
      time: new Date(0),
      queueVisible: "",
      position: {},
      key: 0,
    };
    this.increment = this.increment.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.toggleQueue = this.toggleQueue.bind(this);
    this.hideQueue = this.hideQueue.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.offset = 0;
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32:
          if (e.target.tagName !== "INPUT") {
            this.handleSimpleAction('togglePlayback')(e);
          }
      }
    });
    this.toggleTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playback.lastAction === SEEK) {
      this.offset = this.getOffset(nextProps);
      this.resetTime();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { time, start } = nextState;
    if (this.offset + time.getTime() - start.getTime() > this.props.playback.duration > 0) {
      this.props.next();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { lastAction, playing } = nextProps.playback;
    switch (lastAction) {
      case RECEIVE_POSITION:
        return false;
      case TOGGLE_PLAYBACK:
        this.toggleTimer(nextProps);
        return true;
      case PREVIOUS:
      case NEXT:
      case RECEIVE_PLAYBACK_SONG:
      case RECEIVE_PLAYBACK_SONG_FROM_QUEUE:
        if (this.state.start === nextState.start) {
          this.offset = 0;
          this.resetTime();
          this.setState({ key: this.state.key + 1 });
        }
        if (this.props.playback.playing !== nextProps.playback.playing) {
          this.toggleTimer(nextProps);
        }
        return true;
      default:
        return true;
    }
  }

  redirectToLogin(e) {
    if (!this.props.currentUser) {
      e.preventDefault();
      this.props.history.push('/login');
      return;
    }
  }

  getOffset({ playback }) {
    const { position } = playback;
    return position;
  }

  format(numSeconds) {
    const sec_num = parseInt(numSeconds, 10);
    const hours   = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours === 0) {
      return [minutes, seconds].join(":");
    } else {
      return [hours, minutes, seconds].join(':');
    }
  }

  resetTime() {
    this.setState({
      start: new Date(0),
      time: new Date(0),
    });
  }

  toggleTimer(nextProps) {
    let playing;
    if (nextProps === undefined) {
      playing = this.props.playback.playing;
    } else {
      playing = nextProps.playback.playing;
    }

    if (playing) {
      this.timer = window.setInterval(this.increment, 1000);
    } else {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  increment() {
    const time = new Date(this.state.time.getTime() + 1000);
    this.setState({ time });
    this.forceUpdate();
  }

  handleSimpleAction(name) {
    return (e) => {
      e.preventDefault();
      this.props[name]();
    };
  }

  hideQueue() {
    const queueVisible = "";
    this.setState({ queueVisible });
    this.forceUpdate();
  }

  toggleQueue() {
    const queueVisible = (this.state.queueVisible === "") ? "queue-visible" : "";
    this.setState({ queueVisible });
    this.forceUpdate();
  }

  parseSec(ms) {
    if (ms < 0) { return 0; }
    return Math.floor(ms/1000);
  }

  getProgressPos() {
    return 100 * (this.state.time.getTime() + this.offset) / this.props.playback.duration;
  }

  getHandlePos() {
    return 100 * (this.state.time.getTime()) / this.props.playback.duration;
  }

  handleDragEnd(e, data) {
    const timelineRect = e.target.parentElement.getClientRects()[0];
    const width = timelineRect.width;
    const handleRect = e.target.getClientRects()[0];
    const normalizedSeekPos = (handleRect.x - timelineRect.x) / width;
    const seekPos = Math.floor(normalizedSeekPos * this.props.playback.duration);
    this.props.seekTo(seekPos);
  }

  render() {
    const { key, start, time } = this.state;
    const { songs, playback, users, currentUser } = this.props;
    const { mute, playing, duration, position, shuffle, loop } = playback;
    const song = songs[playback.songQueue[playback.songIdx]];

    if (!song) {
      return <div></div>;
    }

    const artist = users[song.artistId];

    const buttonStatus = ((playing) ? "playbar-pause" : "");
    const shuffleStatus = ((shuffle) ? "shuffle-toggle" : "");
    const muteStatus = ((mute) ? "mute-toggle" : "");

    let loopStatus;
    switch (loop) {
      case null:
        loopStatus = "";
        break;
      case LOOP_ONE:
        loopStatus = "loop-one";
        break;
      case LOOP_ALL:
        loopStatus = "loop-all";
        break;
      default:
        loopStatus = "brown";
    }

    const progressWidth = { width: `${this.getProgressPos()}%` };
    const handleLeftDist = { left: `${this.getHandlePos()}%` };

    return (
      <div>
        <div className="bottom-filler"/>
        <div className="playbar-bg">Playbar Background</div>
        <div className="full-width-container">
          <section className={`playbar ${this.state.queueVisible}`}>
            <section className="playbar-control-buttons">
              <div onClick={this.handleSimpleAction('previous')} className="playbar-prev controls"></div>
              <div onClick={this.handleSimpleAction('togglePlayback')} className={`playbar-play controls ${buttonStatus}`}></div>
              <div onClick={this.handleSimpleAction('next')} className="playbar-next controls"></div>
              <div onClick={this.handleSimpleAction('toggleShuffle')} className={`playbar-shuffle controls ${shuffleStatus}`}></div>
              <div onClick={this.handleSimpleAction('toggleLoop')} className={`playbar-loop controls ${loopStatus}`}></div>
            </section>
            <span className="playbar-timeline-time-passed">
             {this.format(this.parseSec(this.offset + time.getTime()))}
            </span>
            <section className="playbar-timeline">
              <div className="progress-background"></div>
              <div className="progress-bar" style={progressWidth}></div>
              {/* <Draggable
                key={key}
                axis="x"
                bounds="parent"
                onStop={this.handleDragEnd}
                > */}
                  <div className="progress-handle" style={handleLeftDist}></div>
              {/* </Draggable> */}
            </section>
            <div className="playbar-timeline-time-left">
              -{this.format(this.parseSec(duration - this.offset - time.getTime()))}
            </div>
            <div className={`playbar-volume ${muteStatus}`}>
              <div onClick={this.handleSimpleAction('toggleMute')} className="volume-mute-div">Content</div>
              <div className="playbar-volume-slider">

              </div>
            </div>
            <section className="playbar-song-info">
              <div className="playbar-image">
                <a className="playbar-image" style={{ backgroundImage: `url(${song.imageUrl})` }}>Artwork</a>
              </div>
              <section className="playbar-song-text-container">
                <Link onClick={this.redirectToLogin.bind(this)} className="playbar-artist truncate" to={`/users/${artist.id}`}>{artist.username}</Link>
                <a className="playbar-title truncate">{song.title}</a>
              </section>
              <LikeToggle type="PLAY_BAR" song={song}/>

              <div onClick={this.toggleQueue} className="playback-queue">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none" fillRule="evenodd">
                    <g fill="#000" fillRule="nonzero">
                      <path d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path>
                    </g>
                  </g>
                </svg>
              </div>

              <PlayBarQueueContainer
                hideQueue={this.hideQueue}
              />

            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default PlayBar;
