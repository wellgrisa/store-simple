import React from 'react';
import { RadioButtonGroup, RadioButton } from 'material-ui';

const styles = {
  button: {
    width: '50%',
    float: 'left'
  },
  label: {
    fontSize:  '0.85em',
    color: 'rgba(255, 255, 255, 0.498039)',
    marginTop: 15
  }
};

export default class SelectableRadioButton extends React.Component {
  renderButtonGroups = (items) => (
    items.map((x, i) => (
      <RadioButton
        style={styles.button}
        key={i}
        value={`${i}`}
        label={x}/>
    ))
  )
  render() {
    return (
      <div style={{width: 'auto'}}>
        <label style={styles.label}>{this.props.hintText}</label>
        <RadioButtonGroup
          defaultSelected={`${this.props.initialValue}`}
          {...this.props}>
          {this.renderButtonGroups(this.props.source)}
        </RadioButtonGroup>
      </div>
    );
  }
}
