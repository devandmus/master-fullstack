import React  from 'react';
import { BsPeopleCircle, BsFillLightningFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

const NavBar = ({ onLogoClick, onProfileClick, loginOk }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center" onClick={onLogoClick} role="button">
          <BsFillLightningFill />
          <div className="ps-2">three pics</div>
        </div>
        {loginOk && <BsPeopleCircle onClick={onProfileClick} role="button" />}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  onLogoClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
  loginOk: PropTypes.bool.isRequired,
}

export default NavBar;
