import React from 'react';

const Header = props => {
  return (
    <header className="header">
      <nav className="nav" onClick={props.onNavClick}></nav>
      {props.logo}
      {props.leftIcon}
    </header>
  );
};

export default Header;
