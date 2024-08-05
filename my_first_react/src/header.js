import React from "react";
import './header.css';

function Header() {
  return (
    <header className="App-header">
      <nav>
        <h3>Experiment with REACTJS</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
