import React from 'react';
import PropTypes from 'prop-types';
import ProfileStyled from './styles/ProfileStyled';
import { logout } from '../../helpers/Users';

const Profile = ({
  avatar,
  username,
  bio,
}) => {
  return (
    <ProfileStyled>
      <figure>
        <img src={avatar} alt="user profile"/>
      </figure>
      <h3>{username}</h3>
      <p>{bio}</p>
      <button onClick={logout} className="btn btn-primary">Logout</button>
    </ProfileStyled>
  );
};


Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
}

Profile.defaultProps = {
  avatar: './img/avatar.png',
  username: '@alex',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

export default Profile;
