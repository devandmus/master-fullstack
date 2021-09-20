import React from 'react';
import { BsPeopleCircle, BsFillLightningFill } from 'react-icons/bs';

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center">
          <BsFillLightningFill />
          <div className="ps-2">three pics</div>
        </div>
        <BsPeopleCircle />
      </div>
    </nav>
  );
};

export default NavBar;
