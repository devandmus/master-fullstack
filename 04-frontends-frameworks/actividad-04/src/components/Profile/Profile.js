import React from 'react';
import PropTypes from 'prop-types';
import ProfileStyled from './styles/ProfileStyled';

const Profile = ({
  avatar,
  username,
  bio,
  onClickLogout,
}) => {
  return (
    <ProfileStyled>
      <figure>
        <img src={avatar} alt="user profile"/>
      </figure>
      <h3>{username}</h3>
      <p>{bio}</p>
      <button onClick={onClickLogout} className="btn btn-primary">Logout</button>
    </ProfileStyled>
  );
};


Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  onClickLogout: PropTypes.func.isRequired,
}

export default Profile;
