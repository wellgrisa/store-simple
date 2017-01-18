import React, { Component, PropTypes } from 'react';
import { add, getAll, remove, edit, select, reset } from '../../actions/document';
import { menuClicked } from '../../actions/app';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import {
  TextField,
  FlatButton,
  RaisedButton,
  Checkbox,
  LinearProgress,
  List,
  FontIcon,
  ListItem,
  ToolbarGroup,
  AppBar,
  Drawer
} from 'material-ui';
import classnames from 'classnames';
import InputMask from 'react-maskedinput';
import {Grid, Row, Col} from 'react-flexbox-grid';
import { ipcRenderer } from 'electron';
import debounce from 'debounce';

import './people.scss';

class People extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      printMode: false
    };
    this.searchTerm = {};
    this.onSearchChangeDebounced = debounce(this.onQuickSearchChanged, 1200);
  }

  static contextTypes = {
    setToolbarButtons: PropTypes.func.isRequired,
    setToolbarGroups: PropTypes.func.isRequired,
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  componentWillMount (){
    this.props.dispatch(getAll());
    this.context.setToolbarButtons([
      {
        label : 'add',
        action : () => this.props.dispatch(push('person/add'))
      },
      {
        label : 'print',
        action : () => this.onPrintClick('report')
      },
      {
        label : 'account_circle',
        action : () => this.onPrintClick('detailed-report')
      },
    ]);

    this.context.setToolbarGroups(this.getSearchGroupAction());
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  onPrintClick (route) {
    this.props.dispatch(menuClicked({ key: 'report-people' }));
    this.props.dispatch(push(`people/${route}`));
  }

  onSelect (document) {
    this.props.dispatch(select(document));
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.document.selectedLength !== this.props.document.selectedLength){
      this.context.setToolbarButtons(this.getToolbarButtons());
    }
  }

  onQuickSearchChanged(){
    let value = this.quickSearch.getValue();

    let regexValue = new RegExp(value, 'ig');

    this.props.dispatch(getAll({ $or : [ { name: { $regex : regexValue } }, { cpf: { $regex : regexValue } }]}));
  }

  onComposedSearch(){
    let searchTerm = this.buildComposedSearch();

    this.props.dispatch(getAll(searchTerm));
  }

  buildComposedSearch () {
    let searchCriteria = Object.keys(this.searchTerm).reduce((x, y) => {
      let value = this.searchTerm[y].getValue();
      if(value){
        x.push({ [y] : { $regex : new RegExp(value, 'ig') }})
      }
      return x;
    },[]);

    let searchTerm = searchCriteria.length > 1
      ? { $or : searchCriteria }
      : searchCriteria[0];

    return searchTerm;
  }

  getSearchGroupAction() {
    return [ <ToolbarGroup style={{ width : '100%' }}>
      <FontIcon
        style={{ float : 'left' }}
        onTouchTap={this.handleToggle}
        className="material-icons">search
      </FontIcon>
      <TextField
        style={{ float : 'left' }}
        fullWidth
        ref={node => this.quickSearch = node}
        onChange={::this.onSearchChangeDebounced}
        hintText="Busca"
      />
    </ToolbarGroup> ];
  }

  getToolbarButtons(){
    if(this.props.document.selectedLength === 0){
      return [
        {
          label : 'add',
          action : () => this.props.dispatch(push('person/add'))
        },
      ];
    }

    return [
      {
        label : 'add',
        action : () => this.props.dispatch(push('person/add'))
      },
      {
        label : 'edit',
        action : () => this.props.dispatch(push(`person/${this.props.document.selectedItem._id}/edit`)),
        disabled : this.props.document.selectedLength !== 1
      },
      {
        label : 'remove',
        action : () => this.onRemove()
    }];
  }

  onRemove () {
    this.props.dispatch(remove(this.props.document.items.filter(x => x.selected)));
  }

  renderDocuments() {

    const listItems = this.props.document.items.map(x => {
      return <ListItem
        key={x._id}
        primaryText={x.name}
        leftCheckbox={<Checkbox checked={x.selected} onClick={::this.onSelect.bind(this, x)}/>} />
    });

    return <List>
      {listItems}
    </List>;
  }

  renderFilterDrawer () {
    return <Drawer
      docked={false}
      width={500}
      openSecondary
      open={this.state.open}
      onRequestChange={(open) => this.setState({open})}
      >
      <AppBar title="Filtrar por:" />
      <Grid className='grid'>
        <Row>
          <Col>
            <TextField
              style={{ float : 'left' }}
              fullWidth
              ref={node => this.searchTerm.name = node}
              hintText="Nome"
            />
            <TextField
              style={{ float : 'left' }}
              fullWidth
              ref={node => this.searchTerm.income = node}
              hintText="Renda"
            />
            <TextField
              style={{ float : 'left' }}
              fullWidth
              ref={node => this.searchTerm.cpf = node}
              hintText="CPF"
            />
            <RaisedButton
              primary
              style={{ float : 'right' }}
              label="Buscar"
              onTouchTap={::this.onComposedSearch}
            />
          </Col>
        </Row>
      </Grid>
    </Drawer>
  }

  render () {
    const { document } = this.props;
    return (
      <div className="people-container" style={{ marginTop : 30 }}>
        <div className={classnames('container', this.state.printMode ? 'print-mode' : '')}>
          <h2>Total: {document && document.items && document.items.length}</h2>
          {this.renderDocuments()}
          {this.renderFilterDrawer()}
        </div>
      </div>
    );
  }
}

export default connect(reducers => ({
  document : reducers.document,
  app : reducers.app
}))(People);
