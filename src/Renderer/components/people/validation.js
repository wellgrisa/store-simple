const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Este campo é obrigatório';
    }
    return errors
  }, {});

const validateChild = requireFields('name');

export const validate = values => {

  const errors = {};
  if (!values.name) {
    errors.name = 'Esse campo é obrigatório';
  } 

  errors.dependents = values.dependents.map(validateChild);

  return errors;
};
