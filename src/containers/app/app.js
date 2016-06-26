import '../../style';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { menuClicked } from '../../actions/app';

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
  LinearProgress,
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { SelectableList } from '../../components/selectable';

const menuitems = [
  { key: 'index', primaryText: 'Inicio', path: '/'},
  { key: 'people', primaryText: 'Pessoas', path: '/people'},
  { key: 'about', primaryText: 'Sobre', path: '/about'}
];

class App extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  handleLinkClick(menuItem){
    this.props.dispatch(menuClicked(menuItem));
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
      <MenuItem key={x.key} value={x.key} onTouchTap={::this.handleLinkClick.bind(this, x)} primaryText={x.primaryText} />
    );
  }

  renderProgress(){
    if(this.props.app.isLoading){
      return <LinearProgress 
        style={{ position : 'absolute', top : 55 }} 
        color='rgb(255, 64, 129)'
      />;
    }
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <header>
            <Toolbar style={{backgroundColor: 'rgb(0, 188, 212)'}}>
              <ToolbarGroup firstChild={true}>
                <DropDownMenu value={this.props.app.currentView}>
                  {this.renderMenuItems()}
                </DropDownMenu>
              </ToolbarGroup>
              {this.renderCustomGroups()}
              <ToolbarGroup float={'right'}>
                  {this.renderToolbarButtons(this.props.app.buttons)}
              </ToolbarGroup>
            </Toolbar>
          </header>
          <section>
          {this.renderProgress()}
          {this.props.children}
          </section>
        </div>
      </MuiThemeProvider>      
    );
  }
}

const mapStateToProps = (reducers) => ({ app : reducers.app })

export default connect(mapStateToProps)(App);
