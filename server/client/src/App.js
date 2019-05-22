import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.js';
import Products from './components/products/Products.js';
import Billing from './components/Billing.js';
import Account from './components/Account.js';
import Landing from './components/Landing.js';
import FirstStep from './components/subscription/firstStep.js';
import SubscriptionBox from './components/subscription/SubscriptionBox.js';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchBlocks()
      .then(() => {
        return this.props.fetchHydration()
      })
      .then(() => {

        return this.props.fetchProtein()
      })
      .then(() => {
        this.props.getAllProducts()
      })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/" component={FirstStep} />
            <Route path='/test' component={Products}/>
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/subscription/options" component={SubscriptionBox} />
            <Route exact path="/account" component={Account} />
          </div>
        </BrowserRouter>
      </div>
    );
  };
}

export default connect(null, actions)(App);
