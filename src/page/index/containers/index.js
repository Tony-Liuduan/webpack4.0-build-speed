import React, { Component } from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Logo from 'components/Logo';
import Icon from 'assets/icon.png';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Logo />
                <Footer />
                <img src={Icon} alt=""/>
            </div>
        );
    }
}
