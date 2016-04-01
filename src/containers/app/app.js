import '../../style';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import mui from 'material-ui';
let AppBar = mui.AppBar
  , LeftNav = mui.LeftNav
  , MenuItem = mui.MenuItem;

const menuitems = [
  {primaryText: 'Survey', value: '/survey'},
  {primaryText: 'Widgets', value: '/widgets'},
  {primaryText: 'Home', value: '/'}
];

@ThemeDecorator(ThemeManager.getMuiTheme(DarkRawTheme))
class App extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  handleLinkClick(){
    this.props.pushState(null, '/about');
  }

  render () {
    return (
      <div>
        <LeftNav
          ref="leftNav"
          width={200}
          open={false}
          docked={false}>
          {menuitems.map(function(menuitem, i) {
            return ( <MenuItem index={i} primaryText={menuitem.primaryText} value={menuitem.value} onClick={::this.handleLinkClick.bind(this, i)}/>
              );
          }, this) }
        </LeftNav>

        <header>
          <AppBar title='MUI Routing' onLeftIconButtonTouchTap={this._handleClick} />
        </header>

        <section>
          {this.props.children}
        </section>

      </div>
    );
  }
}

export default connect()(App);
