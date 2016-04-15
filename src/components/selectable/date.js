import React from 'react';
import { DatePicker  } from 'material-ui';

import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

if (areIntlLocalesSupported('pt-Br')) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  require('intl/locale-data/jsonp/pt-BR');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

export default class SelectableDatePicker extends React.Component {

  constructor(props) {
    super(props);
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
