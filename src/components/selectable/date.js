import React from 'react';
import { DatePicker  } from 'material-ui';

import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

// Use the native Intl if available
if (areIntlLocalesSupported('pt-Br')) {
  console.log('uhuuuuul');
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  require('intl/locale-data/jsonp/pt-Br');
  console.log(IntlPolyfill.DateTimeFormat);
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

export default class SelectableDatePicker extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      value: props.defaultValue,
    };
  }

  handleChange = (event, value) => {
    this.props.onChange(value);
    this.setState({ value });
  };

  render() {
    return (
      <DatePicker
        className='date-picker'
        autoOk={true}
        floatingLabelText={this.props.hintText}
        hintText={this.props.hintText}
        value={this.state.value}
        onChange={::this.handleChange}
        DateTimeFormat={DateTimeFormat}
        locale='pt-Br'
      />
    );
  }
}
