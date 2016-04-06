import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FlatButton from 'material-ui/lib/flat-button';
import { add } from '../../actions/document'

export const fields = ['username'];

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Esse campo é obrigatório';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  return errors;
};

class Form extends React.Component {
  getDocument () {
    return {
      name : this.name.getValue()
    };
  }
  onSave () {
    this.props.dispatch(add(this.getDocument()));
    this.props.onSaveSuccess();
  }
  render () {
    const { fields: { username } } = this.props;
    return (
      <form>
        <div className='container'>
          <div className='row'>
            <TextField ref={node => {
              this.name = node;
              }}
              hintText="Nome"
              {...username}
              errorText={username.error ? username.error : ''}
            />
          </div>
          <div className='row text-right'>
            <FlatButton
              label="Salvar"
              primary={true}
              keyboardFocused={true}
              onTouchTap={::this.onSave}
            />,
            <FlatButton
              label="Cancelar"
              onTouchTap={this.props.onSaveSuccess}
            />
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (reducers) =>
{
  return {
    document : reducers.document
  }
};

export default reduxForm({
  form: 'simple',
  fields,
  validate
})(Form);
