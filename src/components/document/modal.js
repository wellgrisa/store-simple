import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import { connect } from 'react-redux';
import { toggleShowDialog } from '../../actions/document'
import Form from './form';

class DocumentForm extends React.Component {
  handleClose () {
    this.props.dispatch(toggleShowDialog());
  }
  render() {
    const { selectedItem, showDialog } = this.props.document;

    return (
      <div>
        <Dialog
          title="Documento"
          modal={false}
          open={showDialog}
          onRequestClose={::this.handleClose}
        >
          <Form onSaveSuccess={::this.handleClose} />
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
