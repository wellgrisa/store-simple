import React, { Component, PropTypes } from 'react';
import { add, getAll, remove, edit } from '../../actions/document';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Modal } from '../../components/document';
import Colors from 'material-ui/lib/styles/colors';
import {
  TextField,
  FlatButton,
  RaisedButton,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  FontIcon
} from 'material-ui';

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
        <FlatButton
          secondary={true}
          label="Adicionar"
          onClick={::this.onEdit}
          icon={<FontIcon className="material-icons">add</FontIcon>}
        />
        <FlatButton
          secondary={true}
          label="Editar"
          onClick={::this.onEdit}
          icon={<FontIcon className="material-icons">create</FontIcon>}
        />
        <FlatButton
          secondary={true}
          label="Remover"
          onClick={::this.onRemove}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
        />
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
