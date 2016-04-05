import React, { Component } from 'react';
import { List, ListItem } from 'material-ui';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);


export default class Selectable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 1
    };
  }
  handleUpdateSelectedIndex(e, index) {
    this.setState({
      selectedIndex: index,
    });
  }
  renderMenuItems() {
    return this.props.items.map((x, i) =>
      <ListItem value={i} primaryText={x.primaryText} />
    );
  }
  render() {
    return (
      <SelectableList
        {...this.props}
        {...this.state}
        valueLink={{value: this.state.selectedIndex, requestChange: ::this.handleUpdateSelectedIndex}}
      >
        {this.renderMenuItems()}
      </SelectableList>
    );
  }
}
