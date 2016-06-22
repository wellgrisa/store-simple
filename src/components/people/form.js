import React, { Component } from 'react';
import { reduxForm, addArrayValue  } from 'redux-form';
import { fields, model } from './model';
import { validate } from './validation';
import { Grid, Row } from 'react-inline-grid';
import { builder } from '../common/builder';
import Colors from 'material-ui/lib/styles/colors';

import {
  TextField
} from 'material-ui';

const styles = {
  floatingLabelStyle: {
    color: Colors.orange500,
  }
};

@reduxForm({ form : 'people', fields : [...fields, 'totalIncome'], validate }, reducers => ({
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
    const { fields } = this.props;
    return (
      <form>
        <Grid>
          <Row>
            <TextField
              floatingLabelText='Renda Total'
              disabled
              floatingLabelStyle={styles.floatingLabelStyle}
              {...fields['totalIncome']}
              value={this.getPersonIncome().toFixed(2)}
            />
            { builder(fields, model, this.props) }
          </Row>
        </Grid>
      </form>
    );
  }
}
