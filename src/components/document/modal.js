import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import { connect } from 'react-redux';
import { toggleShowDialog, add } from '../../actions/document'
import Form from './form';
import { getValues } from 'redux-form';

class DocumentForm extends React.Component {
  handleClose () {
    this.props.dispatch(toggleShowDialog());
  }
  handleSubmit = (data) => {
    this.props.dispatch(add(data));
    this.props.dispatch(toggleShowDialog());
  }
  handleSave () {
    this.refs.form.submit();
  }
  render() {
    const { selectedItem, showDialog } = this.props.document;
    const actions = [
            <FlatButton
               label="Salvar"
               primary={true}
               onTouchTap={::this.handleSave}
            />,
           ];
    return (
      <div>
        <Dialog
          title="Documento"
          modal={false}
          actions={actions}
          open={showDialog}
          onRequestClose={::this.handleClose}
        >
          <Form {...selectedItem} ref='form' onSubmit={::this.handleSubmit} />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (reducers) =>
{
  return {
    document : reducers.document
  }
};

export default connect(mapStateToProps)(DocumentForm);
