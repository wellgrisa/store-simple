import React from 'react';
import { Toggle  } from 'material-ui';
import { styles } from '../common/';

export default class SelectableToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }
  onToggle = (event, value) => {
    this.props.onChange(value);
    this.setState({value});
  }
  render() {
    return (
      <div>
        <label style={styles.label}>{this.props.hintText}</label>
          <Toggle
            style={{ marginTop : 15 }}
            onToggle={::this.onToggle}
            labelPosition="right"
            label={this.props.value ? this.props.toggleLeftValue : this.props.toggleRightValue}
            defaultToggled={this.props.value}
          />
      </div>
    );
  }
}
