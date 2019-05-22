import React, { Component } from 'react';
import SubscriptionCart from './SubscriptionCart';
import Products from '../products/Products'

class SubscriptionBox extends Component {
  render() {
    return (
      <div>Customize your Box!
      <br/>
      <SubscriptionCart />
      <Products />
      </div>
    )
  }
}

export default SubscriptionBox;
