import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import { connect } from 'react-redux';
import { toggleShowDialog } from '../../actions/document'

class Form extends React.Component {

  render () {
    const { fields: { username } } = this.props;
    return (
      <form>
      <div className='container'>
        <TextField ref={node => {
          this.name = node;
          }}
          hintText="Nome"
          {...username}
          defaultValue={this.props.document.name}
          errorText={username.error ? username.error : ''}
        />
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

export default connect(mapStateToProps)(DocumentEditDialog);
