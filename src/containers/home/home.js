import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import Avatar from 'material-ui/lib/avatar';
import CircularProgress from 'material-ui/lib/circular-progress';
import { add, getAll } from '../../actions/document';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

export const fields = ['username'];

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Esse campo é obrigatório';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  return errors;
};

class Home extends Component {
  componentWillMount (){
    this.props.dispatch(getAll());
  }
  onSave () {
    this.props.dispatch(add({ name : this.name.getValue() }));
  }
  onAbout () {
    this.props.dispatch(push('/about'));
  }
  onRefresh () {
    this.props.dispatch(getAll());
  }
  renderDocuments() {
    return this.props.document.items.map(x => <ListItem key={x._id}
      primaryText={x.name}
    />);
  }
  renderProgress(){
    if(this.props.document.isLoading){
      return <CircularProgress />;
    }
  }
  render () {
    const { fields: { username } } = this.props;

    return (
      <form>
      <div className='container'>
        {this.renderProgress()}
        <Link to="/about">
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <TextField ref={node => {
          this.name = node;
        }} hintText="Nome"
        {...username}
        errorText={username.touched && username.error ? username.error : ''}/>

        <FlatButton label="Save" onClick={::this.onSave} />
        <FlatButton label="About" onClick={::this.onAbout} />
        <List>
          {this.renderDocuments()}
        </List>
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

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
}, mapStateToProps)(Home);
