import React, { Component, PropTypes } from 'react';
import { fetch } from '../../actions/document';
import { setToolbarButtons, setToolbarCustomGroup } from '../../actions/app';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import classnames from 'classnames';

import { builder } from '../../components/common/reportBuilder';
import { model } from '../../components/people/reportModel';

import { ipcRenderer } from 'electron';


class DetailReport extends Component { 

   static contextTypes = {
    setToolbarButtons: PropTypes.func.isRequired,
    cleanToolbarGroups: PropTypes.func.isRequired,
  }

  componentWillMount (){
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

    if(this.props.params){
      this.props.dispatch(fetch(this.props.params.id))
    }
  }

  onPrintClick () {
    ipcRenderer.send('print-view');
  }

  renderReport () {
    const { selectedItem } = this.props.document;

    if(this.props.params.id && !selectedItem._id) {
      return null;
    }

    return <div>{ builder(model, selectedItem) } </div>;
  }

  render () {
    return (      
      <div style={{ marginTop : 50 }}>
        <div className='container letter'>
          {this.renderReport()}
        </div>
      </div>
    );
  }
}

export default connect(reducers => ({
  document : reducers.document
}))(DetailReport);
