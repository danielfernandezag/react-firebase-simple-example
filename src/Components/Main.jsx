import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import '../CSS/Main.css';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Header/>
        <Body/>
        <Footer/>
      </div>
    );
  };
}
