import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import { connect } from 'react-redux';
import { toggleShowDialog, add, save } from '../../actions/document'
import Form from './form';
import { getValues } from 'redux-form';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class DocumentForm extends React.Component {
  handleClose () {
    this.props.dispatch(toggleShowDialog());
  }
  handleSubmit = (data) => {
    console.log(data);
    const { selectedItem } = this.props.document;
    if(selectedItem){
      data._id = selectedItem._id;
    }
    this.props.dispatch(save(data));
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
          modal
          autoScrollBodyContent
          actions={actions}
          open={showDialog}
          contentStyle={customContentStyle}
          onRequestClose={::this.handleClose}
        >
          <Form {...this.props.document} {...selectedItem} ref='form' onSubmit={::this.handleSubmit} />
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
