/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import "./nav.scss";

const Nav = () => {
  return (
    <ul className='nav justify-content-center'>
      <li className='nav-item'>
        <NavLink exact to='/' activeClassName='active' className='nav-link'>
          <div className='link-wrapper d-inline'>Home</div>
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/loved' activeClassName='active' className='nav-link'>
          <div className='link-wrapper d-inline'>Loved</div>
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/albums' activeClassName='active' className='nav-link'>
          <div className='link-wrapper d-inline'>Albums</div>
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/artists' activeClassName='active' className='nav-link'>
          <div className='link-wrapper d-inline'>Artists</div>
        </NavLink>
      </li>
    </ul>
  );
};

export default withRouter(Nav);
