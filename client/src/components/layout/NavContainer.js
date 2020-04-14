import React, { Component } from 'react';
import SideDrawer from './SideDrawer';
import Navbar from './Navbar';
import Overlay from './Overlay';
import Hamburger from './Hamburger';

class NavContainer extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;
    let sideDrawer;

    if (this.state.sideDrawerOpen) {
      backdrop = <overlay click={this.backdropClickHandler} />;
      sideDrawer = <SideDrawer />;
    }
    return (
      <div style={{ height: '100%' }}>
        <Hamburger drawerClickHandler={this.drawerToggleClickHandler} />
        <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} click={this.backdropClickHandler} />
        <Overlay click={this.backdropClickHandler} show={this.state.sideDrawerOpen} />
      </div>
    );
  }
}

export default NavContainer;
