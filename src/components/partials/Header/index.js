import React from "react";
import PropTypes from "prop-types";
import "./header.scss";

const Header = props => {
  return (
    <div className='container-fluid bg-dark'>
      <header className='waves-container'>
        <div className='row'>
          <div className='col text-center my-5'>
            <h1 className='mt-5'>{props.title}</h1>
            <p>Welcome to this little Deezer API test app</p>
          </div>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 170'>
          <path
            fill='#ffffff'
            d='M0,178s366-67,720,0,359,68,720,0V320H0Z'
            transform='translate(0 -148.22)'
          />
        </svg>
      </header>
    </div>
  );
};

export default Header;
