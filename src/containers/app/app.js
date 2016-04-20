import '../../style';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { title, getAll } from '../../actions/app';

import {
  AppBar,
  LeftNav,
  List,
  ListItem,
  IconMenu,
  MenuItem,
  IconButton,
  FontIcon,
  DropDownMenu
} from 'material-ui';

import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

@ThemeDecorator(ThemeManager.getMuiTheme(DarkRawTheme))
class App extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  componentWillMount (){
    this.props.dispatch(getAll());
  }

  handleLinkClick(menuItem){
    this.props.dispatch(title(menuItem));
    this.props.dispatch(push(menuItem.path));
  }

  renderMenuItems(items) {
    return items.map((x, i) =>
      <MenuItem key={i} value={i} onTouchTap={::this.handleLinkClick.bind(this, x)} primaryText={x.primaryText} />
    );
  }

  render () {
    return (
      <div>

        <header>
          <AppBar
            title={this.props.app.title}
            onLeftIconButtonTouchTap={this._handleClick}
            iconElementLeft={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                {this.renderMenuItems(this.props.app.forms)}
              </IconMenu>
            }
          />
        </header>
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default connect(reducers => ({ app : reducers.app }))(App);
