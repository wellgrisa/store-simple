import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fields, validate } from './validation';

@reduxForm({ form : 'document', fields, validate }, reducers => ({
  initialValues: reducers.document.selectedItem
}))
export default class Form extends React.Component {
  render () {
    const { fields: { name } } = this.props;
    return (
      <form>
        <div className='container'>
          <div className='row'>
            <TextField ref={node => {
              this.name = node;
              }}
              hintText="Nome"
              {...name}
              defaultValue={this.props.name}
              errorText={name.error ? name.error : ''}
            />
          </div>
        </div>
      </form>
    );
  }
}
