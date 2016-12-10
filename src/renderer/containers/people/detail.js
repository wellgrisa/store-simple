import React, { Component, PropTypes } from 'react';
import { add, getAll, remove, edit, select, save, fetch } from '../../actions/document';
import { setToolbarButtons } from '../../actions/app';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import {
  TextField,
  FlatButton,
  RaisedButton,
  Checkbox,
  CircularProgress,
  List,
  ListItem
} from 'material-ui';
import Form from '../../components/people/form';

class Detail extends Component {
  componentWillMount (){
    this.props.dispatch(setToolbarButtons([
      {
        label : 'save',
        action : () => this.refs.form.submit()
      },
      {
        label : 'print',
        action : () => this.onPrintClick() 
      },
      {
        label : 'undo',
        action : () => this.props.dispatch(goBack())
      },
    ]))

    if(this.props.params){
      this.props.dispatch(fetch(this.props.params.id))
    }
  }

  onPrintClick () {
    this.props.dispatch(push(`person/${this.props.document.selectedItem._id}/edit/report`));
  }
  
  handleSubmit = (data) => {
    const { selectedItem } = this.props.document;
    if(selectedItem){
      data._id = selectedItem._id;
    }
    this.props.dispatch(save(data));
    this.props.dispatch(push('people'))
  }

  renderForm () {
    const { selectedItem } = this.props.document;

    if(this.props.params.id && !selectedItem._id) {
      return null;
    }

    return <Form 
      {...this.props.document} 
      {...selectedItem} 
      ref='form' 
      onSubmit={::this.handleSubmit} 
    />
  }

  render () {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

export default connect(reducers => ({
  document : reducers.document,
  reduxForm : reducers.form
}))(Detail);
