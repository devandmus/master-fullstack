import React  from 'react';
import { BsPeopleCircle, BsFillLightningFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

const NavBar = ({ onLogoClick, onProfileClick }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center" onClick={onLogoClick} role="button">
          <BsFillLightningFill />
          <div className="ps-2">three pics</div>
        </div>
        <BsPeopleCircle onClick={onProfileClick} role="button" />
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  onLogoClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
}

export default NavBar;
