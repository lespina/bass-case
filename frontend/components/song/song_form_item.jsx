export const DEFAULT_IMAGE_URL = "https://s3.amazonaws.com/basscase-dev/default-track-image.png";

import React from 'react';

class SongFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      image: null,
      imageUrl: props.includedImageData || DEFAULT_IMAGE_URL,
      isSaving: false,
    };

    this.updateImage = this.updateImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIncludedImageData(this.props);
  }

  handleIncludedImageData(props) {
    const imageData = props.includedImageData;
    if (imageData) {
      fetch(imageData)
        .then((res) => res.blob())
        .then((blob) => {
          const image = new File([blob], props.audio.name.replace('mp3','jpg'), { type: 'image/jpeg' });
          this.setState({ image });
    });
    }
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
    formData.append("song[audio]", this.props.audio);
    formData.append("formIdx", this.props.idx);

    if (this.state.image) {
      formData.append("song[image]", this.state.image);
    }

    this.props.createSong(formData).then((song) => {
      this.props.handleCancel();
      this.setState({ isSaving: false });
      return song;
    }, errors => {
      console.error(errors);
      this.setState({ isSaving: false });
    });
  }

  errors() {
    const { errors } = this.props;

    if (errors !== undefined) {
      return (
        <ul className="upload-errors">
          {
            errors.map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })
          }
        </ul>
      );
    } else {
      return;
    }
  }

  getImageUrl() {
    if (this.props.includedImageData && this.state.imageUrl === DEFAULT_IMAGE_URL) {
      return this.props.includedImageData;
    } else {
      return this.state.imageUrl;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleIncludedImageData(nextProps);
  }

  render() {
    const { isSaving, title } = this.state;
    const { idx, audio } = this.props;
    const disabled = ((isSaving) ? { disabled: "disabled" } : {});

    return (
      <li className="active-uploads-item">

        <section className="active-upload editing">
          <div className="edit-status-text">Ready. Click Save to post this track.</div>
          {this.errors()}
          <form onSubmit={this.handleSubmit} className="active-upload-form">

            <div className={(isSaving) ? "loading loading-bg" : "loading-bg"} style={{color: "transparent"}}>Loading&#8230;</div>

            <div className="active-upload-form-edit">
              <div className="edit-fields">
                <div className="title-field">
                  <label htmlFor={`song-form-title-${idx}`}>Title</label>
                  <input onChange={this.handleChange('title')} id={`song-form-title-${idx}`} className="input-title" type="text" value={title} {...disabled}></input>
                </div>


                <div className="upload-file-name">
                  <span>{audio.name}</span>
                </div>

                <div className="image-preview" style={{ backgroundImage: `url(${this.getImageUrl()})` }}>
                  <div className="image-button">
                    <div className="image-chooser">
                      <label className="image-chooser-btn bc-btn" htmlFor={`image-chooser-input-${idx}`}>Update image</label>
                      <input id={`image-chooser-input-${idx}`} onChange={this.updateImage} type="file" {...disabled}/>
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
