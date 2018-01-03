const DEFAULT_IMAGE_URL = "https://s3.amazonaws.com/basscase-dev/default-track-image.png";

import React from 'react';

class SongFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: null,
      imageUrl: DEFAULT_IMAGE_URL,
    };

    this.updateImage = this.updateImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(attrName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [attrName]: e.target.value });
    };
  }

  updateImage(e) {
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

    this.setState({ image: file });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song[title]", this.state.title);
    formData.append("song[image]", this.state.image);
    formData.append("song[audio]", this.props.audio);

    this.props.createSong(formData);
  }

  render() {
    const { title, imageUrl } = this.state;

    return (
      <li className="active-uploads-item">
        <section className="active-upload editing">
          <div className="edit-status-text">Ready. Click Save to post this track.</div>
          <form onSubmit={this.handleSubmit} className="active-upload-form">
            <div className="active-upload-form-edit">
              <div className="edit-fields">
                <div className="title-field">
                  <label htmlFor="song-form-title">Title</label>
                  <input onChange={this.handleChange('title')} id="song-form-title" className="input-title" type="text" value={title}></input>
                </div>

                <div className="image-preview" style={{ backgroundImage: `url(${imageUrl})` }}>
                  <div className="image-button">
                    <div className="image-chooser">
                      <label className="image-chooser-btn bc-btn" htmlFor="image-chooser-input">Update image</label>
                      <input id="image-chooser-input" onChange={this.updateImage} type="file"/>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="active-upload-form-buttons">
              <div className="required-text"><span className="orange">*</span> Required fields</div>
              <button type="submit" className="active-upload-form-save-btn bc-btn">Save</button>
              <button type="button" className="active-upload-form-cancel-btn bc-btn">Cancel</button>
            </div>

          </form>
        </section>
      </li>
    );
  }
}

export default SongFormItem;
