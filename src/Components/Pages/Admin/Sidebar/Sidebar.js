import React, { useState } from 'react';
import './sidebar.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen }) { // Accept isOpen as a prop
  const [open, setOpen] = useState(false);

  const Dropdown = () => {
    setOpen(!open);
  };

  return (
    // Conditionally apply the display style based on isOpen
    <div className="sidebar vh-100" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="sidebar-header text-white p-4">
        <span className="brand-name fs-4"><b>BODY STORE</b></span>
      </div>

      <hr className="text-white" />
      <div className="sidebar-sticky sidebar2">
        <ul className="nav flex-column my-1">
          <li className="nav-item my-1">
            <NavLink to='/Dashboard/admin' className="nav-link text-white">
              <i className="icon bi-speedometer mr-2 h5"></i>
              <strong className="h5"> Dashboard</strong>
            </NavLink>
          </li>
          <li className="nav-item my-1">
            <NavLink to='/Dashboard/admin/create-category' className="nav-link text-white">
              <i className="icon bi-box mr-2 h5"></i>
              <strong className="h5"> Category</strong>
            </NavLink>
          </li>
          <li className="nav-item my-1">
            <div className="nav-link text-white cursor-pointer" onClick={Dropdown}>
              <i className="icon bi-caret-down mr-2 h5"></i>
              <strong className="h5"> Product</strong>
            </div>
            {open && (
              <div className="Dropdown m-2">
                <li className="nav-item my-1">
                  <NavLink to='/Dashboard/admin/create-product' className="nav-link text-white">
                    <i className="icon bi-cart mr-2 scroll-text"></i>
                    <strong className="scroll-text">Create Products</strong>
                  </NavLink>
                </li>
                <li className="nav-item my-1">
                  <NavLink to='/Dashboard/admin/products' className="nav-link text-white">
                    <i className="icon bi-cart mr-2 scroll-text"></i>
                    <strong className="scroll-text">All Products</strong>
                  </NavLink>
                </li>
              </div>
            )}
          </li>
          <li className="nav-item my-1">
            <NavLink to='/Dashboard/admin/users' className="nav-link text-white">
              <i className="icon bi-person-fill mr-2 h4"></i>
              <strong className="h5"> Users</strong>
            </NavLink>
          </li>
          <li className="nav-item my-1">
            <NavLink to='/Dashboard/admin/orders' className="nav-link text-white">
              <i className="icon bi-clipboard-check-fill h5 m-1"></i>
              <strong className="h5 m-1">Orders </strong>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
