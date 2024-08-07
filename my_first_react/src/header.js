import React from "react";
// import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// function Header() {
  class Header extends React.Component {
  render(){
  return (
    <header className="App-header">
           <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <h3 className="navbar-brand mb-0">Experiment with REACTJS</h3>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
    </header>
  );
}
}






export default Header;
