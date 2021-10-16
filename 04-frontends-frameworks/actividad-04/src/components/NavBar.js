import React  from 'react';
import { BsPeopleCircle, BsFillLightningFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getUser } from '../services.helpers';

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" role="button">
          <BsFillLightningFill />
          <div className="ps-2">three pics</div>
        </Link>
        { getUser() && (
          <Link className="navbar-brand d-flex align-items-center" to="/profile" role="button">
            <BsPeopleCircle />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
