import React, { Component } from 'react';
import SubscriptionCart from './SubscriptionCart';
import Products from '../products/Products';
import { Link } from 'react-router-dom';

class SubscriptionBox extends Component {
  render() {
    return (
      <div>Customize your Box!
      <br/>
      <SubscriptionCart />
      <Products />
      <Link to='/asfkasnfkasf'>Next</Link>
      </div>
    )
  }
}

export default SubscriptionBox;
