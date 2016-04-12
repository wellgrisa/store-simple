import React from 'react';
import { RadioButtonGroup, RadioButton } from 'material-ui';

export default class SelectableRadioButton extends React.Component {
  renderButtonGroups = (items) => (
    items.map((x, i) => (
      <RadioButton
        key={i}
        value={`${i}`}
        label={x}/>
    ))
  )
  render() {
    return (
      <RadioButtonGroup {...this.props} defaultSelected={`${this.props.value}`}>
        {this.renderButtonGroups(this.props.items)}
      </RadioButtonGroup>
    );
  }
}
