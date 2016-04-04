import '../../style';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';

import mui from 'material-ui';
let AppBar = mui.AppBar
  , LeftNav = mui.LeftNav
  , List = mui.List
  , ListItem = mui.ListItem
  , MenuItem = mui.MenuItem;

const menuitems = [
  { primaryText: 'Inicio', value: '/'},
  { primaryText: 'Sobre', value: '/about'}
];

@ThemeDecorator(ThemeManager.getMuiTheme(DarkRawTheme))
class App extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  handleLinkClick(path){
    this.props.dispatch(push(path));
  }

  renderMenuItems() {
    return menuitems.map(x =>
      <ListItem onTouchTap={::this.handleLinkClick.bind(this, x.value)} primaryText={x.primaryText} />
    );
  }

  render () {
    return (
      <div>

        <header>
          <AppBar title='MUI Routing' onLeftIconButtonTouchTap={this._handleClick} />
        </header>

        <div className='col-xs-3'>
          <List>
           {this.renderMenuItems()}
         </List>
        </div>
        <div className='col-xs-9'>
          <section>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}

export default connect()(App);
