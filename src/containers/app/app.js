import '../../style';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { title } from '../../actions/app';

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

import { SelectableList } from '../../components/selectable';

const menuitems = [
  { primaryText: 'Inicio', path: '/'},
  { primaryText: 'Sobre', path: '/about'}
];

@ThemeDecorator(ThemeManager.getMuiTheme(DarkRawTheme))
class App extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  handleLinkClick(menuItem){
    this.props.dispatch(title(menuItem.primaryText));
    this.props.dispatch(push(menuItem.path));
  }

  renderMenuItems() {
    return menuitems.map((x, i) =>
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
                {this.renderMenuItems()}
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

const mapStateToProps = (reducers) => ({ app : reducers.app })

export default connect(mapStateToProps)(App);
