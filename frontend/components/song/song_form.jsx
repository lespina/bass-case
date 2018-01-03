import React from 'react';
// import jsmediatags from 'jsmediatags';

class SongForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      file: null,
      imageUrl: null
    };

    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    const tags = jsmediatags.getAllTags(file.path);
    // console.log(tags.picture);

    debugger

    // fileReader.onloadend = () => {
    //   this.setState({
    //     file,
    //   });
    // };
  }

  handleChange(attrName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [attrName]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { title, imageUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="song-form-title" value={title} >Title</label>
        <input onChange={this.handleChange('title')} id="song-form-title" type="text"/>
        <input onChange={this.updateFile} type="file"/>
        <button>Upload!</button>
        <img src={imageUrl} />
      </form>
    );
  }
}

export default SongForm;
