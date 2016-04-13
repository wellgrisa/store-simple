export default {
  fields : [
    {
      type : 'TextField',
      key : 'name',
      hintText : 'Nome',
      is : '8'
    },
    {
      type : 'TextField',
      key : 'surname',
      hintText : 'Sobrenome',
      is : '4'
    },
    {
      type : 'TextField',
      key : 'job',
      hintText : 'Profissão'
    },
    {
      type : 'TextField',
      key : 'address',
      hintText : 'Endereço'
    },
    {
      type : 'TextField',
      key : 'number',
      hintText : 'Número',
      is : '2'
    },
    {
      type : 'Date',
      key : 'bof',
      hintText : 'Nascimento',
      is : '10'
    },
    {
      type : 'RadioGroup',
      key : 'genre',
      hintText : 'Sexo',
      source : ['Masculino', 'Feminino']
    },
    {
      type : 'SelectField',
      key : 'list',
      hintText : 'Trabalho',
      source : 'items'
    }
  ]
}
