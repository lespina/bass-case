import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import PlayBarQueue from './play_bar_queue';

class SortablePlayBarQueue extends React.Component {
  onSortEnd({oldIndex, newIndex}) {
    let songIdx = this.props.songIdx;
    if (this.props.songIdx === oldIndex) {
      songIdx = newIndex;
    }

    this.props.updateQueue(
      arrayMove(this.props.songQueue, oldIndex, newIndex),
      songIdx
    );
  }

  render() {
    const {
      songs,
      songQueue,
      currentSongId,
      playing,
      songIdx,
      togglePlayback,
      receivePlaybackSong,
      clearQueue,
      hideQueue
    } = this.props;

    return <PlayBarQueue
      handle=".queue-item-drag-handle"
      songs={songs}
      songQueue={this.props.songQueue}
      currentSongId={currentSongId}
      playing={playing}
      songIdx={songIdx}
      togglePlayback={togglePlayback}
      receivePlaybackSong={receivePlaybackSong}
      clearQueue={clearQueue}
      hideQueue={hideQueue}
      onSortEnd={this.onSortEnd.bind(this)}
      axis={"y"}
      lockAxis
      useDragHandle={true}
      hideSortableGhost={false}
    />;
  }
}

export default SortablePlayBarQueue;
