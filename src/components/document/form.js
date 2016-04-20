import React, { Component } from 'react';
import {
  TextField,
  SelectField,
  MenuItem
} from 'material-ui';
import { connect } from 'react-redux';
import { reduxForm, addArrayValue  } from 'redux-form';
import { model } from './model';
import { validate, buildFields } from './validation';
import { Grid, Row } from 'react-inline-grid';
import { builder } from '../common/builder';
import { fields } from '../common/builder';

@reduxForm({ form : 'document', validate }, reducers => ({
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
            {builder(this.props)}
          </Row>
        </Grid>
      </form>
    );
  }
}
