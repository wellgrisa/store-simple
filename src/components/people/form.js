import React, { Component } from 'react';
import { reduxForm, addArrayValue  } from 'redux-form';
import { fields, model } from './model';
import { validate } from './validation';
import { Grid, Row } from 'react-inline-grid';
import { builder } from '../common/builder';

@reduxForm({ form : 'document', fields, validate }, reducers => ({
  initialValues: reducers.document.selectedItem
}), { addValue : addArrayValue } )
export default class Form extends React.Component {
  componentDidUpdate(){
    window.dispatchEvent(new Event('resize'));
  }
  render () {
    return (
      <form>
        <Grid>
          <Row>
            {builder(this.props.fields, model, this.props)}
          </Row>
        </Grid>
      </form>
    );
  }
}