import React, { Component } from 'react';
import {
  TextField,
  SelectField,
  MenuItem
} from 'material-ui';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Model from './model';
import { modelFieldsKeys as fields, validate, buildFields } from './validation';

@reduxForm({ form : 'document', fields, validate }, reducers => ({
  initialValues: reducers.document.selectedItem
}))
export default class Form extends React.Component {
  handleChange () {

  }
  renderDocuments() {

  }
  render () {
    const { fields: { name, job } } = this.props;
    return (
      <form>
        <div className='container'>
          <div className='row'>
            {buildFields(this, Model)}
          </div>
        </div>
      </form>
    );
  }
}
