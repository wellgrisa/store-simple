export default {
  fields : [
    {
      type : 'TextField',
      key : 'name',
      hintText : 'Nome'
    },
    {
      type : 'TextField',
      key : 'surname',
      hintText : 'Sobrenome'
    },
    {
      type : 'RadioGroup',
      key : 'genre',
      hintText : 'Sexo',
      source : ['Masculino', 'Feminino']
    },
    {
      type : 'SelectField',
      key : 'job',
      hintText : 'Trabalho',
      source : 'items'
    }
  ]
}
