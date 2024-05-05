# <p align="left">BassCase README<img align="right" src="app/assets/images/logo-medium.png" alt="BassCase" width="100px"></p>

[BassCase](https://bass-case.net/) is a single page web application clone of the social music-sharing and listening website, [SoundCloud](https://soundcloud.com/), featuring audio track uploads, user profiles, likes, reposts, follows, continuous playback, and seamless control of queued track order.

<p align="right"><sup>Logo design credit: <a href="http://www.alisonbushor.com/">Alison Bushor</a></sup></p>

![Landing Page](/app/assets/images/landing.png "BassCase Landing Page")

### Technologies

BassCase is built with a Ruby on Rails/Postgres backend and a React/Redux frontend.

* [react-sound](https://github.com/leoasis/react-sound) - Audio file playback & control
* [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) - Drag-handle sorting support on next-up song queue

### Key Features

#### User Profiles

Visitors may sign up and log in from the landing page. Displayed components include an index of a user's song posts and reposts sorted by time, a sidebar containing a sampling of followers and followees with hover-over profile previews, and a section for user stats.

![Own Profile Page](/app/assets/images/user-profile-self.png "BassCase Profile Page (1/3)")

Users may edit their own profiles by updating their profile/banner images directly or toggling the edit form modal for more options.

![Edit Profile Page](/app/assets/images/user-profile-edit.png "BassCase Profile Page (2/3)")

#### Song Uploads

Users may upload their own tracks on to the site. Supported formats include MP3, MP4, OGG, OPUS, WAVE (WAV), and FLAC.

![Upload Page](/app/assets/images/upload.png "BassCase Uploads (1/3)")

![Upload Form](/app/assets/images/single-upload-form.png "BassCase Uploads (2/3)")

###### Additional feature: Support for multiple concurrent song uploads

If a user is so inclined, they may upload multiple songs individually from the upload page without having to revisit the form for each new upload. This may be accomplished by adding audio files to the file input multiple times in succession. Each song may be uploaded by simply clicking its corresponding 'save' button.

![Multiple Upload Forms](/app/assets/images/multiple-upload-form.png "BassCase Uploads (3/3)")

#### Likes & Reposts

Users may 'like' and 'repost' songs in a number of locations wherever they appear, including

1. Directly from the post in a user's stream or user profile
2. Directly in the play bar for the current song
3. In the up-next queue on the right-hand side of any hovered-over song
4. In the pop-up actions menu on right-hand side of any hovered-over song in the up-next queue

![Likes & Reposts](/app/assets/images/actions.png "BassCase Likes & Reposts")

<!-- ![Likes & Reposts 1/4](/app/assets/images/actions-1.png "BassCase Likes & Reposts (1/4)")

![Likes & Reposts 2/4](/app/assets/images/actions-2.png "BassCase Likes & Reposts (2/4)")

![Likes & Reposts 3/4](/app/assets/images/actions-3.png "BassCase Likes & Reposts (3/4)")

![Likes & Reposts 4/4](/app/assets/images/actions-4.png "BassCase Likes & Reposts (4/4)") -->

Reposted songs appear together with uploaded tracks on a user's profile page.

![Reposts](/app/assets/images/user-profile-with-reposts.png "BassCase Profile With Reposts")

#### Follows

Users may follow or unfollow other users to subscribe to their post/repost history. This follow toggle button appears where the 'edit' button normally does on the users own profile.

![Follows (1/3)](/app/assets/images/follows-1.png "BassCase Follows (1/3)")

Additionally, users may follow others within the 'who to follow' sidebar or by hovering over another user's followers/followees and clicking the follow toggle button.

![Follows (2/3)](/app/assets/images/follows-2.png "BassCase Follows (2/3)")

![Follows (3/3)](/app/assets/images/follows-3.png "BassCase Follows (3/3)")

#### User Stream

Users generate a stream of songs upon login at the root page, displaying a time-ordered index of songs posted or reposted by all of the people they are following as well as themselves.

![Stream (1/2)](/app/assets/images/stream.png "BassCase Stream Page (1/2)")

Additionally, a refreshable sidebar is displayed with user profile previews that may be followed or unfollowed.

![Stream (2/2)](/app/assets/images/stream-sidebar.png "BassCase Stream Page (2/2)")

#### Instant Search

Users may search for users and songs through the embedded search bar in the navbar component. Results are updated instantly and displayed in a dropdown list of semantically icon-labeled items.

![Search](/app/assets/images/search.png "BassCase Search")

#### Continuous Song Playback

Visitors and users may play songs from the playbar, song queue, or displayed song components for uninterrupted playback when navigating the BassCase site.

#### Seamless Queue Control

BassCase keeps track of an internal list of songs to be played back to the user that can be accessed via a collapsible, scrolling widget brought up by clicking the icon in the bottom right corner of the play bar.

![Toggle Queue Icon](/app/assets/images/toggle-queue.png "BassCase Queue (1/2)")

![Queue](/app/assets/images/queue.png "BassCase Queue (2/2)")

Within the collapisble queue, visitors and users may toggle song playback, skip to previous or next songs, add a song to be played next up after the current song, clear or refresh the queue, or navigate to a different position in the queue. Additionally, users toggle options to loop a single song, loop over the entire queue, and shuffle or unshuffle their ordered list of songs through various buttons on the playbar.

###### Additional feature: Support for dragging sort

If one looks closely, each queue item contains a little 'handle' icon on the left-hand side of its display when hovered over by the mouse.

![Drag Handles](/app/assets/images/drag-handles.png "BassCase Sortable Queue (1/2)")

These are actually designated spots by which the user may click and drag a given song queue item from its current spot to a new place up or down the queue for intuitive, painless reordering.

### How to run locally

Install ruby, npm, & postgres, shared-mime-info, imagemagick, taglib & bundle. 

```
brew install postgresql
brew install libpq
brew install shared-mime-info
brew install imagemagick
brew install taglib
```

Update development.rb paperclip config
```
# in terminal, find your imagemagick path
which convert
  => "/opt/local/bin/" (example)

# /config/environments/development.rb
Paperclip.options[:command_path] = "/opt/local/bin/" (change this line to output of `which convert`)
```

Set up ENV variables for your chosen seed user password & S3 configs:
```
# in terminal or bash config file such as .bashrc or .zshrc
export BASSCASE_SEED_PASSWORD="(...)"

export s3_bucket="(...)"
export s3_access_key_id="(...)"
export s3_secret_access_key="(...)"
export s3_region="(...)"
```

In one console window, install gems, setup db & run rails server.
```
bundle install --path vendor/bundle
bin/rails db:setup
bin/rails server
```

If you get an error with installing gem taglib-ruby, add set the following ENV variable and run `bundle install` again:
```
export TAGLIB_DIR=(your taglib install directory, run `brew info taglib` to check this, ex. "/opt/homebrew/Cellar/taglib/1.13.1")
```

In another console window, install js packages and run webpack
```
npm install -f
npm start
```

Website should now be served to localhost:3000 reachable in your web browser.  Note, you must seed the db with at least 1 user or the app will not render (ex. guest account).  Alternatively, comment out the following conditional before you create your first user:
```
// app.jsx
if (Object.keys(this.props.users).length === 0 || Object.keys(this.props.songs).length === 0) {
      return null;
    }
```

The landing page will also look formatted incorrectly until ther are at least 12 songs in the DB.