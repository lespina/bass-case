import React from 'react';
import { Link } from 'react-router-dom';

const USER = "user";
const SONG = "song";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      searchResults: []
    };
    this.ready = true;
    this.getReady = this.getReady.bind(this);
  }

  handleChange(attrName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [attrName]: e.target.value });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.ready) {
      this.ready = false;
      this.updateSearchResults();
      window.setTimeout(this.getReady, 50);
    }
  }

  getReady() {
    this.ready = true;
  }

  updateSearchResults() {
    const searchResults = [];
    const { searchString } = this.state;
    const searchStr = searchString.toLowerCase();
    const { users, songs } = this.props;


    for (let i = 0; i < users.length; i++) {
      const username = users[i].username.toLowerCase();


      if (searchString.length > 0 && username.startsWith(searchStr)) {
        searchResults.push(users[i]);
      }
      if (searchResults.length > 3) { break; }
    }

    for (let i = 0; i < songs.length; i++) {
      const title = songs[i].title.toLowerCase();

      if (searchString.length > 0 && title.startsWith(searchStr)) {
        searchResults.push(songs[i]);
      }
      if (searchResults.length > 8) { break; }
    }

    this.setState({ searchResults });
  }

  searchStringLi() {
    if (this.state.searchString.length > 0) {
      return (
        <li className="search-result-item">
          <div className="search-result-content">
            <div className="search-result-text no-margin">Search for "{this.state.searchString}"</div>
          </div>
        </li>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <section className="nav-middle">
        <form className="nav-search">
          <input className="nav-search-input" onChange={this.handleChange('searchString')} value={this.state.searchString} type="search" placeholder="Search"></input>
          <ul className="search-results">
            {this.searchStringLi()}
            {
              this.state.searchResults.map((result, idx) => {
                let type;
                if (result.username) {
                  type = USER;
                } else {
                  type = SONG;
                }
                return <SearchResultItem key={idx} result={result} type={type}/>;
              })
            }
          </ul>
          <button type="submit">Search</button>
        </form>
      </section>
    );
  }
}

const SearchResultItem = ({ result, type }) => {
  const displayText = ((type === USER) ? result.username : result.title);
  const iconClass = ((type === USER) ? "user-icon" : "song-icon");
  const imageUrl = ((type === USER) ? result.avatarUrl : result.imageUrl);
  const style = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <li className="search-result-item">
      <div className="search-result-content">
        <Link to={`/${type}s/${result.id}`} className="search-result-image" style={style}></Link>
        <Link to={`/${type}s/${result.id}`} className="search-result-text">{displayText}</Link>
      </div>
      <div className={`search-result-icon ${iconClass}`}></div>
    </li>
  );
};

export default SearchForm;
