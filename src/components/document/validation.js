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
  SelectableToggle
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
    switch (x.type) {
    case 'TextField':
      return <TextField
          key={i}
          hintText={x.hintText}
          floatingLabelText={x.hintText}
          {...field}
          defaultValue={props[x.key]}
          errorText={field.error ? field.error : ''}
        />;
    case 'SelectField':
      return <SelectableField
          key={i}
          value={props[x.key]}
          {...field}
          items={props[x.source]}
          floatingLabelText={x.hintText}
        />
    case 'RadioGroup':
      return <SelectableRadioButton
          key={i}
          hintText={x.hintText}
          value={props[x.key]}
          {...field}
          items={x.source}
        />
    case 'Toggle':
      return <SelectableToggle
          key={i}
          {...x}
          {...field}
        />
    default:
      return <TextField
        key={i}
        hintText={x.hintText}
        {...field}
        defaultValue={props[x.key]}
        errorText={field.error ? field.error : ''}
      />
  }}).map((x, i) => <Cell is="6 nospace" key={i}>{x}</Cell>);
}
