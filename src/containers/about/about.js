import React from 'react';
import { Link } from 'react-router';

export default class About extends React.Component {
    render() {
        return <div className='login'>
          <h1>Sobre</h1>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>;
    }
}
