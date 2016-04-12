import React, { Component } from 'react';
import { List, ListItem } from 'material-ui';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);


export default class Selectable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  handleUpdateSelectedIndex(e, value) {
    this.setState({ value });
  }

  renderMenuItems() {
    return this.props.items.map((x, i) =>
      <ListItem key={x.value} value={x.value} primaryText={x.primaryText} />
    );
  }

  getValue() {
    return this.state.value ? this.state.value : undefined;
  }

  render() {
    return (
      <SelectableList
        {...this.props}
        {...this.state}
        valueLink={{value: this.state.value, requestChange: ::this.handleUpdateSelectedIndex}}
      >
        {this.renderMenuItems()}
      </SelectableList>
    );
  }
}
