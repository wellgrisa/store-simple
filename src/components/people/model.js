export const dependent = {
  fields : [
    {
      type : 'Icon',
      key : 'icon',
      icon : 'delete',
      col : '1 bottom',
    },
    {
      type : 'Text',
      key : 'name',
      hintText : 'Nome',
      col : '3'
    },
    {
      type : 'Text',
      key : 'surname',
      hintText : 'Sobrenome',
      col : '3'
    },
    {
      type : 'Text',
      key : 'rg',
      hintText : 'RG',
      col : '2',
      mask : '11111111'
    },
    {
      type : 'Select',
      key : 'list',
      hintText : 'Parentesco',
      source : ['Conjugê', 'Filho'],
      col : '3'
    },
    {
      type : 'TextIcon',
      key : 'money',
      hintText : 'Renda 0.00',
      col : '2',
      icon : 'attach_money'
    },
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
      type : 'Text',
      key : 'job',
      hintText : 'Profissão',
      col : '3'
    },
    {
      type : 'Text',
      key : 'address',
      hintText : 'Endereço',
      col : '6'
    },
    {
      type : 'Text',
      key : 'number',
      hintText : 'Número',
      col : '2',
      mask : '1111'
    },
    {
      type : 'Text',
      key : 'neighborhood',
      hintText : 'Bairro',
      col : '4'
    },
    {
      type : 'Text',
      key : 'rg',
      hintText : 'RG',
      col : '3',
      mask : '11111111'
    },
    {
      type : 'Text',
      key : 'cpf',
      hintText : 'CPF',
      col : '3',
      mask : '111-111-111.11'
    },
    {
      type : 'Date',
      key : 'date-of-birth',
      hintText : 'Nascimento',
      col : '3'
    },
    {
      type : 'Text',
      key : 'age',
      hintText : 'Idade',
      col : '3',
      mask : '11111111111'
    },
    {
      type : 'RadioGroup',
      key : 'genre',
      hintText : 'Sexo',
      source : ['Masculino', 'Feminino'],
      col : '4'
    },
    {
      type : 'Select',
      key : 'list',
      hintText : 'Trabalho',
      source : 'items',
      col : '4'
    },
    {
      type : 'Complex',
      model : dependent,
      key : 'dependents',
      fields : ['name'],
      hintText : 'Dependentes'
    },
  ]
}

export const fields = model.fields.reduce((keys, item) => {
  if(item.type === 'Complex'){
    item.model.fields.forEach(field => keys.push(`${item.key}[].${field.key}`));
  }else{
    keys.push(item.key);
  }
  return keys;
}, [])
