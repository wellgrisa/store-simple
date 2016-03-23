import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';

import '../../style';

class App extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  render () {
    return (
      <div>
      <AppBar
          title="Genésio App"
        />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(App);
