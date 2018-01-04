import React from 'react';
import SongIndexItem from './song_index_item';
import shuffle from 'shuffle-array';

class SongIndex extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div className="song-index-container">
        <ul className="song-index">
          {
            shuffle(this.props.songs, { copy: true }).slice(0, 12).map((song, idx) => {
              return <SongIndexItem key={song.id} song={song} idx={idx}/>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default SongIndex;
