const DEFAULT_IMAGE_URL = "https://s3.amazonaws.com/basscase-dev/default-track-image.png";

import React from 'react';

class SongFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: null,
      imageUrl: DEFAULT_IMAGE_URL,
      isSaving: false,
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

    this.setState({ isSaving: true });
    const formData = new FormData();
    formData.append("song[title]", this.state.title);
    formData.append("song[image]", this.state.image);
    formData.append("song[audio]", this.props.audio);

    this.props.createSong(formData).then((song) => {
      this.props.handleCancel();
      this.setState({ isSaving: false });
      return song;
    }, errors => {
      console.log(errors);
      this.setState({ isSaving: false });
    });
  }

  render() {
    const { isSaving, title, imageUrl } = this.state;
    const { audio } = this.props;
    const disabled = ((isSaving) ? { disabled: "disabled" } : {});

    return (
      <li className="active-uploads-item">

        <div className={(isSaving) ? "loading" : ""} style={{color: "transparent"}}>Loading&#8230;</div>

        <section className="active-upload editing">
          <div className="edit-status-text">Ready. Click Save to post this track.</div>
          <form onSubmit={this.handleSubmit} className="active-upload-form">
            <div className="active-upload-form-edit">
              <div className="edit-fields">
                <div className="title-field">
                  <label htmlFor="song-form-title">Title</label>
                  <input onChange={this.handleChange('title')} id="song-form-title" className="input-title" type="text" value={title} {...disabled}></input>
                </div>

                <div className="upload-file-name">
                  <span>{audio.name}</span>
                </div>

                <div className="image-preview" style={{ backgroundImage: `url(${imageUrl})` }}>
                  <div className="image-button">
                    <div className="image-chooser">
                      <label className="image-chooser-btn bc-btn" htmlFor="image-chooser-input">Update image</label>
                      <input id="image-chooser-input" onChange={this.updateImage} type="file" {...disabled}/>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="active-upload-form-buttons">
              <div className="required-text"><span className="orange">*</span> Required fields</div>
              <button type="submit" className="active-upload-form-save-btn bc-btn">Save</button>
              <button onClick={this.props.handleCancel} type="button" className="active-upload-form-cancel-btn bc-btn">Cancel</button>
            </div>

          </form>
        </section>
      </li>
    );
  }
}

export default SongFormItem;
