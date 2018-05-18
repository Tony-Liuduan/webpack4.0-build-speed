import React, { Component } from 'react';
//import Footer from 'components/Footer';
import Header from 'components/Header';
import Logo from 'components/Logo';
import Table from 'components/Table';
import Icon from 'assets/icon.png';


export default class App extends Component {
    state = {
        FooterComponent: null,
        rows: [
            {
                id: 0,
                title: 'Title 0',
            },
        ]
    };

    componentWillMount() {
        setTimeout(() => {
            import(/* webpackChunkName: "footer" */ 'components/Footer').then(FooterComponent => {
                this.setState({ FooterComponent: FooterComponent.default });
            });
        }, 5000);
    }

    handleAddRow = () => {
        const { rows } = this.state;
        this.setState({ rows: rows.concat([{ id: rows.length, title: `Title ${rows.length}` }]) });
    }

    render() {
        let { FooterComponent } = this.state;
        if (!FooterComponent) {
            return <div>loading...</div>
        }
        return (
            <div className="App">
                <Header />
                <Logo />
                <button onClick={this.handleAddRow}>Add row</button>
                <br/>
                <br/>
                <Table rows={this.state.rows} />
                <FooterComponent />
                <img src={Icon} alt=""/>
            </div>
        );
    }
}
