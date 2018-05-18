import React from 'react';
//import Button from 'components/Button';
import AsyncLoad from 'components/AsyncLoad';
import './index.scss';


const Button = AsyncLoad(import(/* webpackChunkName: "button" */ 'components/Button'));
class TableRow extends React.PureComponent {
    render() {
        return  <tr className='row'>
            <td className='cell'>{this.props.title}</td>
            <td className='cell'>
                <Button/>
            </td>
        </tr>
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