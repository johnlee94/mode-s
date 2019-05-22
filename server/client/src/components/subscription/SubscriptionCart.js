import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
let cartStyle = {
  width: "35%",
  float: "left"
}

class SubscriptionCart extends Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
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

  getTotalPerItem(id) {
    console.log("productsFromCart", this.props.products)
    if (_.isEmpty(this.props.products)) {
      return
    }
    let total = 0;
    console.log(this.props.products[id].price);
    total += (parseFloat(this.props.products[id].price) *  parseInt(this.props.cart.quantityById[id]))
    console.log('total', total)
    return total.toFixed(2)
  }

  getTotal() {
    if (_.isEmpty(this.props.products)) {
      return
    }
    let total = 0;
    this.props.cart.addedIds.map(id => {
      total += (parseFloat(this.props.products[id].price) *  parseInt(this.props.cart.quantityById[id]))
    })
    return total.toFixed(2);
  }

  getDiscountedTotal() {
    if (_.isEmpty(this.props.products)) {
      return
    }
    return {
      discountedTotal: (this.getTotal() * this.getDiscount()).toFixed(2),
      discount: (this.getTotal() - (this.getTotal() * this.getDiscount())).toFixed(2)
    }
  }


    getDiscount() {
      if(this.getTotal() > 50.00) {
        return .80
      } else {
        return .90
      }
    }


  renderCartItems() {
    console.log('productsFromCart', this.props.products)
    console.log('addedIdsFromCart', this.props.cart.addedIds)
    console.log('quantityMap', this.props.cart.quantityById)
    return this.props.cart.addedIds.map((id) => {
      if(this.props.products[id] !== undefined) {
      return (
          <li>{this.props.products[id].title} - {this.props.products[id].flavor}: ${this.props.products[id].price} x {this.props.cart.quantityById[id]}: ${this.getTotalPerItem(id)} <a style={{textDecoration: "underline"}} onClick={()=> this.props.removeFromCart(id)}>Remove</a></li>
      ) } else {
        return (<li>Loading</li>)
      }
    })
  }



  render() {
    return (
      <div style={cartStyle}>
        <h3>My Subscription Items</h3>
        <ul>{this.renderCartItems()}</ul>
        <p>Total: ${this.getTotal() == undefined ? 0 : this.getTotal()}</p>
        <p>Discount Rate: {this.getDiscount() == .8 ? "20%" : "10%"  } - Savings: ${this.getDiscountedTotal() == undefined ? 0 : this.getDiscountedTotal().discount}</p>
        <p>Final Total: ${this.getDiscountedTotal() == undefined ? 0 : this.getDiscountedTotal().discountedTotal}</p>
      </div>
    )
  }
  // <p>Discount Rate: {this.getDiscount() == .8 ? "20%" : "10%"  } - Savings: ${this.getDiscountedTotal() == undefined ? 0 : this.getDiscountedTotal().discount}</p>
  // <p>Final Total: ${this.getDiscountedTotal() == undefined ? 0 : this.getDiscountedTotal().discountedTotal}</p>
}

function mapStateToProps({ cart, products }) {
  return { cart, products };
}

export default connect(mapStateToProps, actions)(SubscriptionCart);
