import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: props.initialValue};
  }

  renderMenuItems = (items) => (
    items.map(item => (
      <MenuItem
        value={item._id}
        key={item._id}
        primaryText={item.name}/>
    ))
  )

  handleChange = (event, index, value) => {
    this.props.onChange(value);
    this.setState({value});
  }

  render() {
    return (
      <div>
        <SelectField
          fullWidth
          floatingLabelText={this.props.hintText}
          {...this.props}
          {...this.state}
          onChange={this.handleChange}>
          {this.renderMenuItems(this.props.source)}
        </SelectField>
      </div>
    );
  }
}
