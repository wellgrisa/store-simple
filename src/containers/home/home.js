import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import Avatar from 'material-ui/lib/avatar';
import { save, getAll } from '../../actions/document';
import { connect } from 'react-redux';

const mapStateToProps = (reducers) =>
{
  return {
    document : reducers.document
  }
};

class Home extends Component {
  componentWillMount (){
    this.props.dispatch(getAll());
  }
  onSave (document) {
    this.props.dispatch(save({ name : this.refs.test.getValue() }));
  }
  onRefresh () {
    this.props.dispatch(getAll());
  }
  renderDocuments() {
    return this.props.document.items.map(x => <ListItem
      primaryText={x.name}
    />);
  }
  render () {
    return (
      <div className='container'>

        <TextField ref='test' hintText="Nome"/>
        <FlatButton label="Save" onClick={::this.onSave} />
        <FlatButton label="Refresh" onClick={::this.onRefresh} />

        <List>
          {this.renderDocuments()}
        </List>

      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
