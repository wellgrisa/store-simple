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
  , List = mui.List
  , ListItem = mui.ListItem
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

        <header>
          <AppBar title='MUI Routing' onLeftIconButtonTouchTap={this._handleClick} />
        </header>

        <div className='col-xs-3'>
          <List>
           <ListItem primaryText="Inbox" />
           <ListItem primaryText="Starred" />
           <ListItem primaryText="Sent mail" />
           <ListItem primaryText="Drafts" />
           <ListItem primaryText="Inbox" />
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
