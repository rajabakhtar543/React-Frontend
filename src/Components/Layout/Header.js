import React,{useState} from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-hot-toast';
import { useCart } from '../../Context/cart';
import {Badge} from 'antd'
import logo from './logo (2).png'
const Header = () => {
  const [Auth, setAuth] = useAuth();
  const [cart] = useCart();
const[mystyle, setStyle]=useState({
  height:"0px"
})
const menuToggle=()=>{
if(mystyle.height=="0px"){
  setStyle({height:"320px"})
}
else{
  setStyle({height:"0px"})
}
}

  const handleLogout = () => {
    setAuth({
      ...Auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };
 

  return (
    <>
 
     <div className="containers">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt=""  />
        </div>
        <nav>
          <ul style={mystyle}>
            <li className="list">
              <NavLink to="/" className="navlink1" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/AllProducts" className="navlink1" aria-current="page">
                Products
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/contact" className="navlink1" aria-current="page">
                Contact Us
              </NavLink>
            </li>
            {!Auth.user ? (
              <>
                <li className="list">
                  <NavLink to="/Register" className="navlink1">
                    Account
                  </NavLink>
                </li>
               
              </>
            ) : (
              <div className="dropdown list">
                <NavLink
                  className=" navlink1 dropdown-toggle list "
                 
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {Auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/Dashboard/${Auth.user.role === 1 ? 'admin' : 'user'}`}
                      className="dropdown-item"
                    >
                      Your Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Register" className="dropdown-item " onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
              </ul>
            <NavLink to="/cart" className=" bag">
      <span className="icon bi-bag">
        <Badge count={cart?.length} className='badge'></Badge>
      </span>
    </NavLink>
            
      <span className="icon bi-list menu-icon" onClick={menuToggle}>
        
      </span>
    
        
        </nav>
      </div>
      </div>
      
    </>
  );
};

export default Header;
