import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: props.initialValue};
  }

  renderMenuItems = (items) => (
    items.map((item, index) => {
      let menuItem = item._id
        ? { key : item._id, text : item.name }
        : { key : index, text : item };

      return <MenuItem
        value={menuItem.key}
        key={menuItem.key}
        primaryText={menuItem.text}/>
    })
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
