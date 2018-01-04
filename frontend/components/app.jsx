import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
import Landing from './landing_page/landing';
import Upload from './upload/upload';
import PlayBarContainer from './play_bar/play_bar_container';
// import SongIndexContainer from './song/song_index_container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.toggleModalOpen = this.toggleModalOpen.bind(this);
  }

  toggleModalOpen() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    return (
      <div className={"full-width" + ((this.state.modalOpen) ? " modal-open" : "")}>
        <GreetingContainer />

        <AuthRoute path="/" component={Landing} />
        <AuthRoute path="/login" component={SessionFormContainer} toggleModalOpen={this.toggleModalOpen}/>
        <AuthRoute path="/signup" component={SessionFormContainer} toggleModalOpen={this.toggleModalOpen} />

        <ProtectedRoute path="/upload" component={Upload}/>
        <PlayBarContainer/>

        {/* TODO: Delete this later.  It is solely for filling the page to be able to scroll at the moment. */}
        {/* <div className="full-width-container">
          <div className="allow-scroll"></div>
        </div> */}
      </div>
    );
  }
}
export default App;
