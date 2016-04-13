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
import { Grid, Row } from 'react-inline-grid';

@reduxForm({ form : 'document', fields, validate }, reducers => ({
  initialValues: reducers.document.selectedItem
}))
export default class Form extends React.Component {
  render () {
    return (
      <form>
        <Grid>
          <Row>
            {buildFields(this, Model)}
          </Row>
        </Grid>
      </form>
    );
  }
}
