import '../../style';

import { BaseTheme } from '../../style/theme';
import { menuClicked, setToolbarButtons, setToolbarCustomGroup } from '../../actions/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
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

class App extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  static childContextTypes = {
    setToolbarButtons: PropTypes.func,
    setToolbarGroups: PropTypes.func,
    cleanToolbarGroups: PropTypes.func,
  }

  getChildContext() {
    return {
      setToolbarButtons: this.setToolbarButtons.bind(this),
      setToolbarGroups: this.setToolbarGroups.bind(this),
      cleanToolbarGroups: this.setToolbarGroups.bind(this)
    };
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

  setToolbarButtons (buttons) {
    this.props.dispatch(setToolbarButtons(buttons));
  }

  setToolbarGroups (groups) {
    this.props.dispatch(setToolbarCustomGroup(groups));
  }

  cleanToolbarGroups () {
    this.props.dispatch(setToolbarCustomGroup([]));
  }

  renderCustomGroups() {
    const { app : { customGroups } } = this.props;
    if(customGroups && customGroups.length){
      return this.props.app.customGroups;
    }
  }

  renderMenuItems (menuitems) {
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
    const { app } = this.props;
    
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(BaseTheme)}>
        <div>
          <header>
            <Toolbar style={{backgroundColor: 'rgb(0, 188, 212)'}}>
              <ToolbarGroup firstChild={true}>
                <DropDownMenu value={app.currentView}>
                  {this.renderMenuItems(app.menuItems)}
                </DropDownMenu>
              </ToolbarGroup>
              {this.renderCustomGroups()}
              <ToolbarGroup>
                  {this.renderToolbarButtons(app.buttons)}
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
