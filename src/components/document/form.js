import React, { Component } from 'react';
import {
  TextField,
  SelectField,
  MenuItem
} from 'material-ui';
import { connect } from 'react-redux';
import { reduxForm, addArrayValue  } from 'redux-form';
import { fields, model } from './model';
import { validate, buildFields } from './validation';
import { Grid, Row } from 'react-inline-grid';

@reduxForm({ form : 'document', fields, validate }, reducers => ({
  initialValues: reducers.document.selectedItem
}), { addValue : addArrayValue } )
export default class Form extends React.Component {
  render () {
    return (
      <form>
        <Grid>
          <Row>
            {buildFields(this, model)}
          </Row>
        </Grid>
      </form>
    );
  }
}
