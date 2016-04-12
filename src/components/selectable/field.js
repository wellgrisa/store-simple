import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }

  renderMenuItems = (items) => (
    items.map(x => (
      <MenuItem
        value={x._id}
        key={x._id}
        primaryText={x.name}/>
    ))
  )

  handleChange = (event, index, value) => {
    this.props.onChange(value);
    this.setState({value});
  }

  render() {
    return (
      <div>
        <SelectField {...this.props} value={this.state.value} onChange={this.handleChange}>
          {this.renderMenuItems(this.props.items)}
        </SelectField>
      </div>
    );
  }
}
