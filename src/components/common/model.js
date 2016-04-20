export const field = {
  fields : [
    {
      type : 'Text',
      key : 'type',
      hintText : 'Type',
      col : '3'
    },
    {
      type : 'Text',
      key : 'key',
      hintText : 'Key',
      col : '3'
    },
    {
      type : 'Text',
      key : 'hintText',
      hintText : 'Hint Text',
      col : '3',
    },
    {
      type : 'Text',
      key : 'col',
      hintText : 'Col',
      col : '3',
    }
  ]
}

export const model = {
  fields : [
    {
      type : 'Text',
      key : 'name',
      hintText : 'Nome',
      col : '9'
    },
    {
      type : 'Complex',
      model : field,
      key : 'fields',
      hintText : 'Fields'
    },
  ]
}

export const fields = model => model.fields.reduce((keys, item) => {
  if(item.type === 'Complex'){
    item.model.fields.forEach(field => keys.push(`${item.key}[].${field.key}`));
  }else{
    keys.push(item.key);
  }
  return keys;
}, [])
