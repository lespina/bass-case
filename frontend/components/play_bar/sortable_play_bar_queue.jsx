import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import PlayBarQueue from './play_bar_queue';

class SortablePlayBarQueue extends React.Component {
  onSortEnd({oldIndex, newIndex}) {
    let songIdx = this.props.songIdx;
    if (songIdx === oldIndex) {
      songIdx = newIndex;
    } else if (songIdx === newIndex && oldIndex < songIdx) {
      songIdx -= 1;
    } else if (songIdx === newIndex && oldIndex > songIdx) {
      songIdx += 1;
    }

    this.props.updateQueue(
      arrayMove(this.props.songQueue, oldIndex, newIndex),
      songIdx
    );
  }

  render() {
    const {
      users,
      songs,
      songQueue,
      currentSongId,
      playing,
      songIdx,
      togglePlayback,
      receivePlaybackSong,
      receiveNewPlaybackSongs,
      clearQueue,
      hideQueue
    } = this.props;

    return <PlayBarQueue
      handle=".queue-item-drag-handle"
      users={users}
      songs={songs}
      songQueue={this.props.songQueue}
      currentSongId={currentSongId}
      playing={playing}
      songIdx={songIdx}
      togglePlayback={togglePlayback}
      receivePlaybackSong={receivePlaybackSong}
      receiveNewPlaybackSongs={receiveNewPlaybackSongs.bind(this, songs)}
      clearQueue={clearQueue}
      hideQueue={hideQueue}
      onSortEnd={this.onSortEnd.bind(this)}
      axis="y"
      useDragHandle={true}
    />;
  }
}

export default SortablePlayBarQueue;
