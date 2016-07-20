import React, { Component } from 'react';
import { reduxForm, addArrayValue  } from 'redux-form';
import { fields, model } from './model';
import { validate } from './validation';
//import { Grid, Row } from 'react-inline-grid';
import { builder } from '../common/builder';
import {orange500, blue500} from 'material-ui/styles/colors';
import moment from 'moment';
import {Grid, Row, Col} from 'react-flexbox-grid';

import {
  TextField
} from 'material-ui';

const styles = {
  floatingLabelStyle: {
    color: orange500,
  }
};

@reduxForm({ form : 'people', fields : [...fields, 'totalIncome'], validate }, reducers => ({
  initialValues: reducers.document.selectedItem
}), { addValue : addArrayValue } )
export default class Form extends React.Component {

  componentWillMount () {
    const { fields } = this.props;    
    fields['date-of-birth'].onCustomBlur = this.onDateOfBirthBlur.bind(this);
  }

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

  onDateOfBirthBlur (date) {
    const editingDate = moment(date, "DD/MM/YYYY", true);
    if(editingDate.isValid()){
      this.props.fields.age.onChange(moment().diff(editingDate, 'years'));
    }else{
      this.props.fields.age.onChange('');
    }
  }

  render () {
    const { fields } = this.props;
    
    return (
      <form>
        <Grid className='grid'>
          <Row>
            <Col xsOffset={10} xs={2} >
              <TextField
                floatingLabelText='Renda Total'
                disabled
                style={{ fontSize : '25px' }}
                floatingLabelFocusStyle={{ textAlign : 'right'}}
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineStyle={{ borderBottomStyle : 'none' }}
                {...fields['totalIncome']}
                value={this.getPersonIncome().toFixed(2)}
              />
            </Col>
            { builder(fields, model, this.props) }
          </Row>
        </Grid>
      </form>
    );
  }
}
