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
        label : 'undo',
        action : () => this.props.dispatch(goBack())
      },
    ]))

    if(this.props.params){
      this.props.dispatch(fetch(this.props.params.id))
    }
  }
  handleSubmit = (data) => {
    const { selectedItem } = this.props.document;
    if(selectedItem){
      data._id = selectedItem._id;
    }
    this.props.dispatch(save(data));
    this.props.dispatch(push('people'))
  }
  render () {
    const { selectedItem } = this.props.document;
    return (
      <div>
        <Form {...this.props.document} {...selectedItem} ref='form' onSubmit={::this.handleSubmit} />
      </div>
    );
  }
}

export default connect(reducers => ({
  document : reducers.document,
  reduxForm : reducers.form
}))(Detail);
