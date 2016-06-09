import React, { Component, PropTypes } from 'react';
import { add, getAll, remove, edit, select } from '../../actions/document';
import { setToolbarButtons, setToolbarCustomGroup } from '../../actions/app';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import {
  TextField,
  FlatButton,
  RaisedButton,
  Checkbox,
  CircularProgress,
  List,
  FontIcon,
  ListItem,
  ToolbarGroup
} from 'material-ui';

class People extends Component {
  componentWillMount (){
    this.props.dispatch(getAll());
    this.props.dispatch(setToolbarButtons([
      {
        label : 'add',
        action : () => this.props.dispatch(push('person/add'))
      },
    ]))

    this.props.dispatch(setToolbarCustomGroup(this.getSearchGroupAction()));
  }

  onSelect (document) {
    this.props.dispatch(select(document));
  }

  componentWillUpdate(nextProps, nextState) {
      this.props.dispatch(setToolbarButtons(this.getToolbarButtons()));
  }

  onSearchChanged(){
    let searchTerm = this.searchTerm.getValue();
    this.props.dispatch(getAll(x => x.name.includes(searchTerm)));
  }

  getSearchGroupAction() {
    return [ <ToolbarGroup>
      <FontIcon className="material-icons">search</FontIcon>
      <TextField
        ref={node => this.searchTerm = node}
        style={{ float : 'left'}}
        onChange={::this.onSearchChanged}
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
        leftCheckbox={<Checkbox defaultChecked={x.selected} onClick={::this.onSelect.bind(this, x)}/>} />
    });

    return <List>
      {listItems}
    </List>;
  }
  renderProgress(){
    if(this.props.document.isLoading){
      return <CircularProgress />;
    }
  }

  render () {
    return (
      <div style={{ marginTop : 20 }}>
        <div className='container'>
          {this.renderProgress()}
          {this.renderDocuments()}
        </div>
      </div>
    );
  }
}

export default connect(reducers => ({document : reducers.document}))(People);
