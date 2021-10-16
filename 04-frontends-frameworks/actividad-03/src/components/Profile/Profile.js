import React from 'react';
import PropTypes from 'prop-types';
import ProfileStyled from './styles/ProfileStyled';

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
