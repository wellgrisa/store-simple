export const dependent = {
  fields : [
    {
      type : 'Icon',
      key : 'icon',
      icon : 'delete',
      col : {
        xs: 1
      },
    },
    {
      type : 'Text',
      key : 'name',
      hintText : 'Nome',
      col : {
        xs: 7
      },
    },
    {
      type : 'Text',
      key : 'rg',
      hintText : 'RG',
      col : {
        xs: 3
      },
      mask : '11111111'
    },
    {
      type : 'Select',
      key : 'list',
      hintText : 'Parentesco',
      source : ['Conjugê', 'Filho'],
      col : {
        xs: 4
      },
    },
    {
      type : 'TextIcon',
      key : 'income',
      hintText : 'Renda',
      col : {
        xsOffset: 4,
        xs: 2
      },
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
      col : {
        xs: 9
      },
    },
    {
      type : 'Text',
      key : 'job',
      hintText : 'Profissão',
      col : {
        xs: 3
      },
    },
    {
      type : 'Text',
      key : 'address',
      hintText : 'Endereço',
      col : {
        xs: 7
      },
    },
    {
      type : 'Text',
      key : 'number',
      hintText : 'Número',
      col : {
        xs: 2
      },
      mask : '1111'
    },
    {
      type : 'Text',
      key : 'neighborhood',
      hintText : 'Bairro',
      col : {
        xs: 4
      },
    },
    {
      type : 'Text',
      key : 'cep',
      hintText : 'CEP',
      col : {
        xs: 3
      },
      mask : '11111-111'
    },
    {
      type : 'Text',
      key : 'complement',
      hintText : 'Complemento',
      col : {
        xs: 5
      },
    },
    {
      type : 'Text',
      key : 'rg',
      hintText : 'RG',
      col : {
        xs: 3
      },
      mask : '11111111'
    },
    {
      type : 'Text',
      key : 'cpf',
      hintText : 'CPF',
      col : {
        xs: 4
      },
      mask : '111-111-111.11'
    },
    {
      type : 'Text',
      key : 'date-of-birth',
      hintText : 'Nascimento',
      col : {
        xs: 5
      },
      mask : '11/11/1111'
    },
    {
      type : 'Text',
      key : 'age',
      hintText : 'Idade',
      col : {
        xs: 3
      },
      disabled: true
    },
    {
      type : 'RadioGroup',
      key : 'genre',
      hintText : 'Sexo',
      source : ['Masculino', 'Feminino'],
      col : {
        xs: 4
      },
    },
    {
      type : 'TextIcon',
      key : 'income',
      hintText : 'Renda',
      col : {
        xs: 2,
      },
      icon : 'attach_money'
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
