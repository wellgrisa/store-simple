import '../../style';

import { BaseTheme } from '../../style/theme';
import { menuClicked, setToolbarButtons, setToolbarCustomGroup, setHotMessage } from '../../actions/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ipcRenderer } from 'electron';

import {
  IconMenu,
  MenuItem,
  RaisedButton, IconButton,
  FontIcon,
  FloatingActionButton,
  DropDownMenu,
  TextField,
  LinearProgress,
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle,
  Snackbar
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

  componentDidMount() {
    ipcRenderer.on('update:hotMessage', ::this.updateHotMessage);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('update:hotMessage', ::this.updateHotMessage);
  }

  updateHotMessage (event, message) {
    this.props.dispatch(setHotMessage(message));
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
      return this.props.app.customGroups.map((x, i) => <div style={{ width: '100%' }} key={i}>{x}</div>);
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

  handleRequestClose () {
    this.props.dispatch(setHotMessage(''));
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
          <Snackbar
            open={!!app.hotMessage}
            message={app.hotMessage}
            autoHideDuration={4000}
            onRequestClose={::this.handleRequestClose}
          />
          </section>
        </div>
      </MuiThemeProvider>      
    );
  }
}

const mapStateToProps = (reducers) => ({ app : reducers.app })

export default connect(mapStateToProps)(App);
