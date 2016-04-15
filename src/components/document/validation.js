import React, { Component } from 'react';
import { model, fields as modelFieldsKeys } from './model';
import {
  TextField,
  SelectField,
  MenuItem,
  FlatButton
} from 'material-ui';
import {
  SelectableField,
  SelectableRadioButton,
  SelectableToggle,
  SelectableDate,
  SelectableText
} from '../selectable/';

import { builder } from '../common/builder';

import { Cell } from 'react-inline-grid';

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required'
    }
    return errors
  }, {});

const validateChild = requireFields('name');

export const validate = values => {

  const errors = {};
  if (!values.name) {
    errors.name = 'Esse campo é obrigatório';
  } else if (values.name.length > 15) {
    errors.name = 'O nome não pode ser maior que 15 caracteres';
  }

  errors.dependents = values.dependents.map(validateChild);

  return errors;
};




export const buildFields = (sender, model) => {

  let { props, props : { fields } } = sender;

  return model.fields.map((x, i) => {
    let field = fields[x.key] || fields[x.key.replace(/\[\]/ig, '')];
    let builtField;
    switch (x.type) {
    case 'Text':
        builtField = <SelectableText
          {...field}
          {...x}
          />
      break;
    case 'Select':
      builtField = <SelectableField
          {...x}
          {...field}
          source={props[x.source]}
        />;
      break;
    case 'RadioGroup':
      builtField = <SelectableRadioButton
          {...x}
          {...field}
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
    case 'Complex':
      builtField = buildList(field, x, props);
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

    return <Cell key={i} is={x.col || '6'}>{builtField}</Cell>;
  });
}

const buildList = (dependents, x, props) => {

  return <div>
    <FlatButton label='Adicionar' onClick={() => dependents.addField()} />
    {!dependents.length && <span style={{ color : '#fff'}}>Sem Dependentes Cadastrados</span>}
    {dependents.map((dependentFields, i) => {
      return builder(dependentFields, x.model);
      // return <div key={i}>
      //   <TextField
      //       fullWidth
      //       {...field.name}
      //       hintText='Nome'
      //       errorText={field.name.error ? field.name.error : ''} />
      // </div>
    })}
  </div>;
}
