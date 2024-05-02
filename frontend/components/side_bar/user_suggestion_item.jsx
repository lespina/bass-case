import React from 'react';
import { Link } from 'react-router-dom';
import * as FormatUtil from '../../util/format_util';
import FollowToggle from '../follow_toggle/follow_toggle_container';

const UserSuggestionItem = ({ user }) => {
  const style = { backgroundImage: `url(${user.avatarUrl})` };
  if (!user.songIds) { return null; }
  return (
    <li className="user-suggestion-item">
      <Link to={`/users/${user.id}`} className="user-suggestion-avatar" style={style}></Link>
      <div className="user-suggestion-content">
        <div className="user-suggestion-title truncate">
          <Link to={`/users/${user.id}`} className="user-suggestion-title-link truncate">{user.username}</Link>
        </div>

        <div className="user-suggestion-meta">
          <div className="user-suggestion-stats">
            <div className="user-suggestion-followers">
              &nbsp;&nbsp;{FormatUtil.formatPlays(user.followerIds.size)}
            </div>
            <div className="user-suggestion-tracks">
              &nbsp;&nbsp;{FormatUtil.formatPlays(user.songIds.length)}
            </div>
          </div>

          <div className="user-suggestion-actions">
            <FollowToggle followee={user} type="USER_SUGGESTION_MODULE"/>
          </div>
        </div>

      </div>
    </li>
  );
};

export default UserSuggestionItem;
