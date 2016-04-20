import React, { Component } from 'react';
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

import { Grid, Row, Cell } from 'react-inline-grid';

export const builder = (props) => {
  const { fields, model } = props;
  let builtElements = model.fields.map((x, i) => {
    let field = fields[x.key];
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
    debugger;
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

  return <Grid>
    <Row>
      {builtElements}
    </Row>
  </Grid>;
}

const buildList = (dependents, x, props) => (
  <div>
    <FlatButton label='Adicionar' onClick={() => dependents.addField()} />
    {!dependents.length && <span style={{ color : '#fff'}}>Sem Dependentes Cadastrados</span>}
    {
      dependents.map(fields => (
        builder({ fields, model : x.model})
      ))
    }
  </div>
)
