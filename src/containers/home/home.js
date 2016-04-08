import React, { Component, PropTypes } from 'react';
import { add, getAll, remove, edit, select } from '../../actions/document';
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
  FontIcon,
  FloatingActionButton,
  AppBar
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
    this.props.dispatch(select(document));
  }

  onAdd () {
    this.props.dispatch(add());
  }

  onEdit () {
    this.props.dispatch(edit(this.props.document.items.find(x => x.selected)));
  }

  renderDocuments() {
    const listItems = this.props.document.items.map(x => {
      return <ListItem
        key={x._id}
        primaryText={x.name}
        leftCheckbox={<Checkbox defaultChecked={x.selected} onClick={::this.onSelect.bind(this, x)}/>} />
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
    const { document : { selectedLength, showDialog } } = this.props;
    return (
      <div className='container'>
        {this.renderProgress()}
        <div className='row text-center toolbar-actions'>
          <FloatingActionButton className='floating-icon' onClick={::this.onAdd}>
             <FontIcon className="material-icons">add</FontIcon>
          </FloatingActionButton>
          <FloatingActionButton disabled={selectedLength !== 1} className='floating-icon' onClick={::this.onEdit}>
             <FontIcon className="material-icons">create</FontIcon>
          </FloatingActionButton>
          <FloatingActionButton disabled={selectedLength === 0} className='floating-icon' onClick={::this.onRemove}>
             <FontIcon className="material-icons">delete</FontIcon>
          </FloatingActionButton>
        </div>
        <Modal
          open={showDialog}
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
