import React, { Component } from 'react';
import './index.scss';

export default class Footer extends Component {
    static PropTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                This is Footer.
            </div>
        );
    }
}
