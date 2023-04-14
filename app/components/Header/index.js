import React from 'react';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';

function Header() {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/media">Medias</HeaderLink>
        <HeaderLink to="/player">Player</HeaderLink>
        <HeaderLink to="/file">File Data</HeaderLink>
        <HeaderLink to="/vom">VOM</HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
