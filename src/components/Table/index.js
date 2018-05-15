import React from 'react';
import Button from '../Button';
import './index.scss';

class TableRow extends React.PureComponent {
    
    render() {
        return React.createElement('tr', { className: 'row' },
            React.createElement('td', { className: 'cell' }, this.props.title),
            React.createElement('td', { className: 'cell' }, React.createElement(Button)),
        );
    }
};

export default class Table extends React.Component {

    render() {
        return React.createElement(
            'table',
            { className: 'table' },
            React.createElement(
                'tbody',
                { className: 'tbody' },
                this.props.rows.map(({ id, title }) => React.createElement(TableRow, { key: id, title }))
            )
        );
    }
};