import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import Avatar from 'material-ui/lib/avatar';
import CircularProgress from 'material-ui/lib/circular-progress';
import Checkbox from 'material-ui/lib/checkbox';
import FontIcon from 'material-ui/lib/font-icon';
import { add, getAll, remove, edit } from '../../actions/document';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Modal } from '../../components/document';

class Home extends Component {
  componentWillMount (){
    this.props.dispatch(getAll());
  }



  onRemove () {
    this.props.dispatch(remove(this.props.document.items.filter(x => x.selected)));
  }

  onRefresh () {
    this.props.dispatch(getAll());
  }

  onSelect (document) {
    document.selected = !document.selected;
  }

  onEdit () {
    this.props.dispatch(edit(this.props.document.items.find(x => x.selected)));
  }

  renderDocuments() {
    const listItems = this.props.document.items.map(x => {
      return <ListItem
        key={x._id}
        primaryText={x.name}
        leftCheckbox={<Checkbox onClick={::this.onSelect.bind(this, x)}/>} />
    });

    return <List>
      {listItems}
    </List>;
  }
  renderProgress(){
    if(this.props.document.isLoading){
      return <CircularProgress />;
    }
  }

  render () {
    return (
      <div className='container'>
        {this.renderProgress()}
        <FlatButton label="Remove" onClick={::this.onRemove} />
        <FlatButton label="Edit" onClick={::this.onEdit} />
        <Modal
          open={this.props.document.showDialog}
        />
        {this.renderDocuments()}
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

export default connect(mapStateToProps)(Home);
