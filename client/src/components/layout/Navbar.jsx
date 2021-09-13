import React from 'react'

import '../../assets/stylesheets/components/layout/Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i className="fas fa-code"></i>EngineersWorld</a>
      </h1>
      <ul>
        <li><a href="profiles.html">Engineers</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;
