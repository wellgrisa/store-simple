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
      type : 'SelectField',
      key : 'job',
      hintText : 'Trabalho',
      source : 'items'
    }
  ]
}
