import React, { Component } from 'react';
import './index.scss';

export default class Header extends Component {
    static PropTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                This is Header.
        </div>
        );
    }
}
