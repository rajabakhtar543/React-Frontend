import React from 'react';
import './Navbar.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from '../../../../Context/auth';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar({ Toggle }) { // Accept Toggle as a prop
  const [Auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ ...Auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  return (
    <nav className="navbar1 navbar-expand-lg navbar-light bg-light d-flex justify-content-between align-items-center sticky-top col">
      <div>
        {/* Trigger Toggle on icon click */}
        <i className="icon bi bi-justify-left h3" onClick={Toggle}></i>
      </div>

      <div className="dropdown">
        <NavLink className="btn navbtn dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {Auth?.user?.name}
        </NavLink>
        <ul className="dropdown-menu">
          <li>
            <NavLink to="/" className="dropdown-item">Go to Site</NavLink>
          </li>
          <li>
            <NavLink to="/Register" className="dropdown-item" onClick={handleLogout}>Logout</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
