import React, { Component } from 'react';
import Model from './model';
import {
  TextField,
  SelectField,
  MenuItem
} from 'material-ui';
import {
  SelectableField,
  SelectableRadioButton,
  SelectableToggle,
  SelectableDate
} from '../selectable/';

import { Cell } from 'react-inline-grid';

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

  let { props, props : { fields } } = sender;

  return model.fields.map((x, i) => {
    let field = fields[x.key];
    let builtField;
    switch (x.type) {
    case 'TextField':
      builtField = <TextField
          fullWidth={true}
          hintText={x.hintText}
          floatingLabelText={x.hintText}
          {...field}
          defaultValue={props[x.key]}
          errorText={field.error ? field.error : ''}
        />;
      break;
    case 'SelectField':
      builtField = <SelectableField
          fullWidth={true}
          value={props[x.key]}
          {...field}
          items={props[x.source]}
          floatingLabelText={x.hintText}
        />;
      break;
    case 'RadioGroup':
      builtField = <SelectableRadioButton
          hintText={x.hintText}
          value={props[x.key]}
          {...field}
          items={x.source}
        />;
      break;
    case 'Toggle':
      builtField = <SelectableToggle
          {...x}
          {...field}
        />;
      break;
    case 'Date':
      builtField = <SelectableDate
          {...x}
          {...field}
        />;
      break;
    default:
      builtField = <TextField
        hintText={x.hintText}
        {...field}
        defaultValue={props[x.key]}
        errorText={field.error ? field.error : ''}
      />;
      break;
    }

    return <Cell key={i} is={x.is || '6'}>{builtField}</Cell>;
  });
}
