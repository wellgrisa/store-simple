import React, { Component } from 'react';
import { reduxForm, addArrayValue  } from 'redux-form';
import { fields, model } from './model';
import { validate } from './validation';
import { Grid, Row } from 'react-inline-grid';
import { builder } from '../common/builder';

import {
  TextField
} from 'material-ui';

@reduxForm({ form : 'people', fields, validate }, reducers => ({
  initialValues: reducers.document.selectedItem
}), { addValue : addArrayValue } )
export default class Form extends React.Component {
  componentDidUpdate(){
    window.dispatchEvent(new Event('resize'));
  }

  getPersonIncome(){
    const { values } = this.props;
    return values.dependents.reduce((x, y) => x + this.getNumericValue(y.income), this.getNumericValue(values.income));
  }

  getNumericValue(value){
    return this.isNumeric(value) ? Number(value) : 0;
  }

  isNumeric(value){
    return !isNaN(value) && value;
  }

  render () {
    return (
      <form>
        <Grid>
          <Row>
            <h1 style={{ color : '#fff', float : 'right' }}>Renda Total: {this.getPersonIncome().toFixed(2)}</h1>
            {builder(this.props.fields, model, this.props)}
          </Row>
        </Grid>
      </form>
    );
  }
}
