import React from 'react';
import _ from 'lodash';
// const jsmediatags = require("../../../jsmediatags.min.js");

class SongForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      image: null,
      audio: null,
      imageUrl: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateFile(attrName) {
    return (e) => {
      e.preventDefault();
      const file = e.currentTarget.files[0];
      let fileReader;
      if (file.type.slice(0, 5) === "image") {
        fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.setState({ imageUrl: fileReader.result });
        };

        fileReader.readAsDataURL(file);
      }

      this.setState({ [attrName]: file });
    };
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

  imagePreview() {
    const { imageUrl } = this.state;
    return (
      (imageUrl === null) ?
      "" :
      <img src={imageUrl} />
    );
  }

  render() {
    const { title, imageUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="song-form-title">Title</label>
        <input onChange={this.handleChange('title')} id="song-form-title" type="text" value={title}/>

        <label htmlFor="song-form-image">Image</label>
        <input onChange={this.updateFile("image")} id="song-form-image" type="file"/>

        <label htmlFor="song-form-file">File</label>
        <input onChange={this.updateFile("audio")} id="song-form-file" type="file"/>
        <button>Upload!</button>
        {this.imagePreview()}
      </form>
    );
  }
}

export default SongForm;
