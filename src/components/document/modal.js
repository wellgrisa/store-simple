import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import { connect } from 'react-redux';
import { toggleShowDialog, add } from '../../actions/document'
import { save } from '../../actions/app'
import Form from './form';
import { getValues } from 'redux-form';
import { builder } from '../common/builder';

import { fields } from '../common/model';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class DocumentForm extends React.Component {
  handleClose () {
    this.props.dispatch(toggleShowDialog());
  }
  handleSubmit = (data) => {
    const { selectedItem } = this.props.document;
    if(selectedItem){
      data._id = selectedItem._id;
    }
    this.props.dispatch(save(data, this.props.app.selectedForm.instance));
    this.props.dispatch(toggleShowDialog());
  }
  handleSave () {
    this.refs.form.submit();
  }
  render() {
    const { selectedItem, showDialog } = this.props.document;
    const { selectedForm } = this.props.app;
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
          autoScrollBodyContent
          actions={actions}
          open={showDialog}
          contentStyle={customContentStyle}
          onRequestClose={::this.handleClose}
        >
          <Form
            ref='form'
            model={selectedForm.model}
            fields={fields(selectedForm.model)}
            selectedItem={selectedItem}
            onSubmit={::this.handleSubmit}
          >
          </Form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (reducers) =>
{
  return {
    document : reducers.document,
    app : reducers.app
  }
};

export default connect(mapStateToProps)(DocumentForm);
