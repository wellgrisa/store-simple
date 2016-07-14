import React from 'react';
import { TextField  } from 'material-ui';
import InputMask from 'react-maskedinput';

export default class SelectableTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.initialValue};
  }
  handleChange(e) {
    this.setState({value : e.currentTarget.value});
  }
  render() {
    return (
      <TextField
          fullWidth
          floatingLabelText={this.props.hintText}
          {...this.props}
          multiLine={false}
          errorText={this.props.error ? this.props.error : ''}>
          {
            this.props.mask
              ? <InputMask
                  mask={this.props.mask}
                  onChange={::this.handleChange}
                  value={this.state.value} />
              : undefined
          }
        </TextField>
    );
  }
}
