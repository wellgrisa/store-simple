import React, { Component, PropTypes } from 'react';
import { getAll } from '../../actions/document';
import { setToolbarButtons, setToolbarCustomGroup } from '../../actions/app';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  Paper, Divider
} from 'material-ui';
import classnames from 'classnames';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { builder } from '../../components/common/reportBuilder';
import { model } from '../../components/people/reportModel';

import { ipcRenderer } from 'electron';

import './detailed-list-report.scss';

class ListReport extends Component {

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
      {
        label : 'undo',
        action : () => this.props.dispatch(goBack())
      },
    ]);

    this.context.cleanToolbarGroups();
  }

  onPrintClick () {
    ipcRenderer.send('print-view');
  }

  renderDocuments() {

    const listItems = this.props.document.items.map(person => (
      <Row className="detailed-person-row" key={person._id}>
        <Col xs={12}>
          <div>{ builder(model, person) } </div>
        </Col>
        <Divider style={{ backgroundColor : 'rgb(48, 48, 48)', marginTop : 20 }} />
      </Row>
    ));

    return <Grid>
      {listItems}
    </Grid>;
  }

  render () {
    return (
      <div className="detailed-report" style={{ marginTop : 50 }}>
        <div className='container letter'>
          {this.renderDocuments()}
        </div>
      </div>
    );
  }
}

export default connect(reducers => ({
  document : reducers.document
}))(ListReport);
