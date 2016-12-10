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

import {Grid, Row, Col} from 'react-flexbox-grid';


export const builder = (model, metadata) => {

  let builtElements = model.fields.map((x, i) => {
    
    if(metadata[x.key] === undefined){
      return null;
    }

    let builtField;

    let metadataValue = `${x.hintText}: `;

    switch (x.type) {
      case 'Text':
      case 'TextIcon':
      case 'Date':
        metadataValue += metadata[x.key];
        builtField = <TextField 
          name={x.key}
          defaultValue={metadataValue}
          underlineShow={false}
          disabled
          />
        break;
      case 'RadioGroup':
      case 'Select':
        metadataValue += x.source[metadata[x.key]]; 
        builtField = <TextField 
          name={x.key}
          defaultValue={metadataValue}
          underlineShow={false}
          disabled
          />
        break;
      case 'Complex':
        if(metadata[x.key].length) {
          builtField = buildList(metadata[x.key], x);
        }
        break;
      
      default:
        metadataValue += metadata[x.key];
        builtField = <TextField
          name={x.key}
          defaultValue={metadataValue}
          underlineShow={false}
          disabled
          />
      break;
    }

    const fieldColumn = x.col 
    ? x.col
    : { xs: 12 };

    return <Col key={i} {...fieldColumn} >{builtField}</Col>;
  });

  return <Row middle="xs">
        {builtElements}
      </Row>;
}

const buildList = (dependents, x) => (
  <div style={{ width: '100%' }}>
    <div style={{textAlign : 'center'}}>
        <span>Dependentes</span>
    </div>
    {
      !dependents.length &&
      <div style={{textAlign : 'center'}}>
        <span>Sem Dependentes Cadastrados</span>
      </div>
    }
    <div className='form-dynamic-children'> <Divider style={{ backgroundColor : 'rgb(48, 48, 48)', marginTop : 20 }} />
    {
      dependents.map(dependentMetadata => builder(x.model, dependentMetadata))
    }
    </div>
  </div>
)
