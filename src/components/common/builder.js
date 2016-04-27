import React, { Component } from 'react';
import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton,
  FontIcon,
  Paper,
  Divider
} from 'material-ui';
import {
  SelectableField,
  SelectableRadioButton,
  SelectableToggle,
  SelectableDate,
  SelectableText
} from '../selectable/';

import { Grid, Row, Cell } from 'react-inline-grid';

export const builder = (formFields, model, props) => {

  let builtElements = model.fields.map((x, i) => {
    let field = formFields[x.key] || formFields[x.key.replace(/\[\]/ig, '')];
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
          source={Array.isArray(x.source) ? x.source : props[x.source]}
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
    case 'Icon':
      builtField = <FontIcon onClick={x.onClick} className="material-icons">{x.icon}</FontIcon>;
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

    return <Cell key={i} is={x.col || '12'}>{builtField}</Cell>;
  });

  return <Grid>
      <Row is='start nospace'>
        {builtElements}
      </Row>
    </Grid>;
}

const buildList = (dependents, x, props) => (
  <div>
    <RaisedButton secondary label='Adicionar' onClick={() => dependents.addField()} />
    {!dependents.length && <span style={{ color : '#fff', marginLeft : 10 }}>Sem Dependentes Cadastrados</span>}
    {
      dependents.map((dependentFields, i) => {
        x.model.fields[x.model.fields.findIndex(x => x.type === 'Icon')].onClick = () => dependents.removeField(i);
        return builder(dependentFields, x.model)
        }
      )
    }
  </div>
)
