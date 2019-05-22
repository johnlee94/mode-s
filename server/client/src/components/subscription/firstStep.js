import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FirstStep extends Component {
  render() {
    return (
      <div>
        <h3>Introducing MODe Subscription..</h3>
        <p>Customize your Subscription Box with your MODe favorites and get it straight delivered to your door every month!</p>
        <div>Automatically receive 10% off all Subscription plans</div>
        <div>Spend $50 or more, and receive 20% of all Subscription plans!</div>
        <button><Link to='/subscription/options'>Next</Link></button>
      </div>
    )
  }
}

export default FirstStep
