import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = props => {
  const nameOfClass = props.darkMode ? 'dark' : 'light';
  return (
    <header>
      <nav id="navbar" className={nameOfClass}>
        <h1 className="logo-text">Herolo Weather Task</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>
    </header>
  )
};

const mapStateToProps = state => {
    return { darkMode: state.darkMode };
}

export default connect(mapStateToProps)(Header);