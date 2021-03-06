import React from 'react';
import _ from 'lodash';
import SongFormItem from './song_form_item';
// const jsmediatags = require("../../../jsmediatags.min.js");

class SongForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFiles: [],
      imageUrl: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addAudio = this.addAudio.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  addAudio(e) {
    e.preventDefault();
    const file = e.currentTarget.files;
    if (file.length > 0) {
      this.setState({ audioFiles: this.state.audioFiles.concat(file)});
    }
  }

  handleChange(attrName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [attrName]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("song[title]", this.state.title);
    formData.append("song[image]", this.state.image);
    formData.append("song[audio]", this.state.audio);

    this.props.createSong(formData);
  }

  handleCancel(idx) {
    return (e) => {
      const updatedAudioFiles = this.state.audioFiles.slice(0);
      updatedAudioFiles.splice(idx, 1);
      this.setState({ audioFiles: updatedAudioFiles });
      if (updatedAudioFiles.length === 0 && !e) {
        this.props.history.push('/');
      }
    };
  }

  activeUploads() {
    const { createSong } = this.props.createSong;
    const numFiles = this.state.audioFiles.length;

    if (numFiles > 0) {
      return (
        <ul className="active-uploads">
          {
            this.state.audioFiles.reverse().map((audio, idx) => {
              return <SongFormItem
                key={idx}
                idx={idx}
                audio={audio[0]}
                createSong={this.props.createSong}
                handleCancel={this.handleCancel(numFiles - 1 - idx)}
                errors={this.props.errors[idx]}
              />;
            }, this)
          }
        </ul>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const { audioFiles, title, imageUrl } = this.state;
    const hasUploads = (audioFiles.length > 0);
    return (
      <section className={`upload ${(hasUploads) ? "has-active-uploads" : ""}`}>
        <div className="upload-background"></div>
        <section className="upload-chooser-container">
          <h1 className="upload-title">Upload to BassCase</h1>
          <div className="upload-chooser">
            <form>
              <label className="choose-file-btn bc-btn" htmlFor="audio-upload">Choose a file to upload</label>
              <input id="audio-upload" onChange={this.addAudio} type="file"></input>
            </form>
          </div>
        </section>
        {this.activeUploads()}
      </section>
    );
  }
}

export default SongForm;
