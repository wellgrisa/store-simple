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

import {Grid, Row, Col} from 'react-flexbox-grid';


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
    case 'TextIcon':
      builtField = <div>
          <div style={{ marginTop : 40, float: 'left' }}>
            <FontIcon className="material-icons">{x.icon}</FontIcon>
          </div>
          <SelectableText
            {...field}
            {...x}
            style={{ width : '75%'}}
            />
        </div>
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

    return <Col key={i} xs={Number(x.col) || 12}>{builtField}</Col>;
  });

  return <Row middle="xs">
        {builtElements}
      </Row>;
}

const buildList = (dependents, x, props) => (
  <div>
    <div style={{textAlign : 'right', marginTop : 20}}>
      <RaisedButton primary label='Adicionar Dependente' onClick={() => dependents.addField()} />
    </div>
    {
      !dependents.length &&
      <div style={{textAlign : 'center'}}>
        <span style={{ color : '#fff' }}>Sem Dependentes Cadastrados</span>
      </div>
    }
    <div className='form-dynamic-children'> <Divider style={{ backgroundColor : '#0097a7', marginTop : 20 }} />
    {
      dependents.map((dependentFields, i) => {
        x.model.fields[x.model.fields.findIndex(x => x.type === 'Icon')].onClick = () => dependents.removeField(i);
        return builder(dependentFields, x.model)
        }
      )
    }
    </div>
  </div>
)
