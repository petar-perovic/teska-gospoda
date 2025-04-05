import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {

  return (
    <header id="header" className="header fixed-top d-flex align-items-center" style={{backgroundColor:"#fff"}}>
      <div className="container d-flex align-items-center justify-content-between headerwdth">
        <NavLink to="/" className="logo d-flex align-items-center me-auto me-lg-0">
          <img src="/assets/images/logo.jpg" alt="logo" />
        </NavLink>
        
        <nav id="navbar" className="navbar">
          <ul>
            <li><NavLink to="/">Teška gospoda - zadatak</NavLink></li>
          </ul>
        </nav>
        <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
      </div>
    </header>
  );
};

export default Header;
