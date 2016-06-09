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
  RaisedButton, IconButton,
  FontIcon,
  FloatingActionButton,
  DropDownMenu,
  TextField,
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui';

import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import { SelectableList } from '../../components/selectable';

const menuitems = [
  { primaryText: 'Inicio', path: '/'},
  { primaryText: 'Pessoas', path: '/people'},
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

  renderToolbarButtons(buttons) {
    return buttons.map((x, i) =>
      <FontIcon className="material-icons" key={i} onClick={x.action} disabled={x.disabled}>
        {x.label}
      </FontIcon>
    );
  }

  renderCustomGroups() {
    if(this.props.app.customGroups.length){
      return this.props.app.customGroups;
    }
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
        <Toolbar style={{backgroundColor: 'rgb(0, 188, 212)'}}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ float : 'right' }} text={this.props.app.title} />
            <IconMenu
              iconButtonElement={
                <IconButton touch={true} style={{ marginTop : 5 }}>
                <FontIcon className="material-icons">
                  menu
                </FontIcon>
                </IconButton>
              }
            >
              {this.renderMenuItems()}
            </IconMenu>
          </ToolbarGroup>
          {this.renderCustomGroups()}
          <ToolbarGroup float={'right'}>
            {this.renderToolbarButtons(this.props.app.buttons)}
          </ToolbarGroup>
        </Toolbar>
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
