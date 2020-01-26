import React from "react";
import PropTypes from "prop-types";
import "./home.scss";
import Header from "components/partials/Header";

const Home = props => {
  return (
    <>
      <Header title='Hello World' />
      <div className='container'>
        <div className='row'>
          <div className='col'>Contenu de la home</div>
        </div>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
