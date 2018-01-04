import React from 'react';

class PlayBar extends React.Component {

  handleSimpleAction(name) {
    return (e) => {
      e.preventDefault();
      this.props[name]();
    };
  }

  render() {
    const { songs, playback } = this.props;
    const song = songs[playback.songQueue[playback.songIdx]];

    if (!song) {
      return <div></div>;
    }

    return (
      <div>
        <div className="playbar-bg">Playbar Background</div>
        <div className="full-width-container">
          <section className="playbar">
            <section className="playbar-control-buttons">
              <div onClick={this.handleSimpleAction('previous')} className="playbar-prev controls">

              </div>
              <div onClick={this.handleSimpleAction('togglePlayback')} className="playbar-play controls">

              </div>
              <div onClick={this.handleSimpleAction('next')} className="playbar-next controls">

              </div>
              <div onClick={this.handleSimpleAction('toggleShuffle')} className="playbar-shuffle controls">

              </div>
              <div onClick={this.handleSimpleAction('toggleLoop')} className="playbar-loop controls">

              </div>
            </section>
            <span className="playbar-timeline-time-passed">
             33:52
            </span>
            <section className="playbar-timeline">
              <div className="progress-background"></div>
              <div className="progress-bar"></div>
            </section>
            <div className="playbar-timeline-time-left">
              -2:30:00
            </div>
            <div className="playbar-volume">
              <div className="playbar-volume-slider">

              </div>
            </div>
            <section className="playbar-song-info">
              <div className="playbar-image">
                <a className="playbar-image" href="#" style={{backgroundImage: `image-url(${song.imageUrl})`}}>Artwork</a>
              </div>
              <section className="playbar-song-text-container">
                <a className="playbar-artist truncate" href="#">{song.artist.username}</a>
                <a className="playbar-title truncate" href="#">{song.title}</a>
              </section>
              <div className="playbar-like">

              </div>

              <div className="playback-queue">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none" fill-rule="evenodd">
                    <g fill="#000" fill-rule="nonzero">
                      <path d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path>
                    </g>
                  </g>
                </svg>
              </div>

            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default PlayBar;
