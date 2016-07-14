import React, { Component, PropTypes } from 'react';
import { getAll } from '../../actions/document';
import { setToolbarButtons, setToolbarCustomGroup } from '../../actions/app';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  Paper
} from 'material-ui';
import classnames from 'classnames';

import { ipcRenderer } from 'electron';


class Report extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      printMode: false
    };
  }

  static contextTypes = {
    setToolbarButtons: PropTypes.func.isRequired,
    cleanToolbarGroups: PropTypes.func.isRequired,
  }
  
  componentWillMount (){
    this.props.dispatch(getAll());
    this.context.setToolbarButtons([
      {
        label : 'print',
        action : () => this.onPrintClick() 
      },
    ]);

    this.context.cleanToolbarGroups();
  }

  onPrintClick () {
    ipcRenderer.send('print-view');
  }

  renderDocuments() {
    
    const listItems = this.props.document.items.map(person => (<TableRow key={person._id}>
        <TableRowColumn>{person.name}</TableRowColumn>
        <TableRowColumn>{person.cpf}</TableRowColumn>
        <TableRowColumn>{person.income}</TableRowColumn>  
      </TableRow>
      )
    );

    return <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Nome</TableHeaderColumn>
          <TableHeaderColumn>CPF</TableHeaderColumn>
          <TableHeaderColumn>Renda</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
         displayRowCheckbox={false}>
        {listItems}
      </TableBody>
    </Table>;
  }

  render () {
    return (
      <div style={{ marginTop : 50 }}>
        <div className='container letter'>
          {this.renderDocuments()}
        </div>
      </div>
    );
  }
}classnames

export default connect(reducers => ({
  document : reducers.document
}))(Report);
