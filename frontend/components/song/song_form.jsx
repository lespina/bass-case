import React from 'react';
import _ from 'lodash';
import SongFormItem from './song_form_item';
import jsmediatags from 'jsmediatags';

class SongForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFiles: [],
      imageData: null
    };

    this.handleAudioFileChange = this.handleAudioFileChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleAudioFileChange(e) {
    e.preventDefault();
    const fileList = e.currentTarget.files;
    const updateImageData = (newData) => {
      this.setState({ imageData: newData });
      this.forceUpdate();
    }

    const file = fileList.item(0);
    jsmediatags.read(file, {
      onSuccess: (result) => {
        if (result.tags.picture) {
          const { data } = result.tags.picture;
          let base64String = "";
          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          const imageData = `data:${data.format};base64,${window.btoa(base64String)}`;
          updateImageData(imageData);
        }
      },
      onFailure: error => console.log('FAILURE!:(', error.type, error.info),
    });

    this.setState({ audioFiles: this.state.audioFiles.concat(fileList) });
  }

  handleChange(attrName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [attrName]: e.target.value });
    };
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
                includedImageData={this.state.imageData}
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
    const { audioFiles } = this.state;
    const hasUploads = (audioFiles.length > 0);
    return (
      <section className={`upload ${(hasUploads) ? "has-active-uploads" : ""}`}>
        <div className="upload-background"></div>
        <section className="upload-chooser-container">
          <h1 className="upload-title">Upload to BassCase</h1>
          <div className="upload-chooser">
            <form>
              <label className="choose-file-btn bc-btn" htmlFor="audio-upload">Choose a file to upload</label>
              <input id="audio-upload" onChange={this.handleAudioFileChange} type="file"></input>
            </form>
          </div>
        </section>
        {this.activeUploads()}
      </section>
    );
  }
}

export default SongForm;
