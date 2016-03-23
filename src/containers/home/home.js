import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import { save } from '../../actions/document';
import { connect } from 'react-redux';

const mapStateToProps = (state) =>
{
  return {
    document : state.document
  }
};

class Home extends Component {
  onSave (document) {
    this.props.dispatch(save({ name : this.refs.test.getValue() }));
  }
  render () {
    return (
      <div className='container'>
        <TextField ref='test' hintText="Nome"/>
        <FlatButton label="Save" onClick={::this.onSave} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
