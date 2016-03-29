import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';

import '../../style';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';

@ThemeDecorator(ThemeManager.getMuiTheme(DarkRawTheme))
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
