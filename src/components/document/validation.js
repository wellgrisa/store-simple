import React, { Component } from 'react';
import {
  TextField,
  SelectField,
  MenuItem
} from 'material-ui';
import Model from './model';
import { SelectableField } from '../selectable/';

export const modelFieldsKeys = Model.fields.map(x => x.key);

export const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Esse campo é obrigatório';
  } else if (values.name.length > 15) {
    errors.name = 'O nome não pode ser maior que 15 caracteres';
  }
  return errors;
};

export const buildFields = (sender, model) => {

  let { props } = sender;
  let { fields } = props;

  return model.fields.map((x, i) => {
    let field = fields[x.key];
    switch (x.type) {
    case 'TextField':
      return <TextField
          key={i}
          hintText={x.hintText}
          {...field}
          defaultValue={props[x.key]}
          errorText={field.error ? field.error : ''}
        />;
    case 'SelectField':
      return <SelectableField
          value={props[x.key]}
          {...field}
          floatingLabelText={x.hintText}
          items={props[x.source]}
        />
    default:
      return <TextField
        key={i}
        hintText={x.hintText}
        {...field}
        defaultValue={props[x.key]}
        errorText={field.error ? field.error : ''}
      />
  }}).map(x => <div className='col-xs-6'>{x}</div>);
}
