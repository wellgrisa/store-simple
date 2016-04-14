export default {
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
      source : ['Masculino', 'Feminino']
    },
    {
      type : 'Select',
      key : 'list',
      hintText : 'Trabalho',
      source : 'items'
    },
  ]
}
