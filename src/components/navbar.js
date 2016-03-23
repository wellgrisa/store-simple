import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {

  componentDidUpdate (prevProps) {
    if (this.props.user !== prevProps.user) {
      window.$(this.refs.menuLeft).sideNav();
      window.$(this.refs.dropdown).dropdown();
    }
  }

  render () {
    let menuLeft;
    let button;
    let menuRight;

    return (
      <nav className="navbar">
        <div className="row">
          <div className="col s12">
            <a href="#" className="brand-logo center">
              <img src={require('../style/image/comma.png')} alt="" className="circle responsive-img" height="50" width="50"/>
            </a>
            <ul id="slide-out" className="side-nav">
              { menuLeft }
            </ul>
            { button }
            { menuRight }
          </div>
        </div>
      </nav>
    );
  }
}
