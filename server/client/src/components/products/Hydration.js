import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';

const imageStyle = {
  width: '100px',
  height: '100px',
  marginLeft: "30px"
};
const listStyle = {
  listStyle: "none",
  borderStyle: "solid",
  maxWidth: "50%",
  float: "left",
  marginLeft: "30px"
}
const divStyle = {
  maxWidth: "50%",
  float: "left",
  marginLeft: "30px",
  borderStyle: "solid"
}

const addToCartButton = {
  maxWidth: '50px'
}

class Hydration extends Component {
  constructor(props) {
    super(props)
    this.props.fetchHydration();
    this.state = {
      quantity: 1
    }
  }

  componentDidMount() {
    this.props.fetchHydration();
  }

  selectVariantById(id) {
    console.log('this.props.hydration.hydration', this.props.hydration.hydration)
    console.log('this.props.hydration.variantId', this.props.hydration.variantId)
    console.log('id', id)
    let selectedHydration
    this.props.hydration.hydration.forEach(hydration => {
      if (hydration.variantId == id) selectedHydration = hydration
    })
      console.log("selectedHydration:", selectedHydration)
      if (selectedHydration) {
        return {
          title: selectedHydration.title,
          imageSrc: selectedHydration.imageSrc,
          flavor: selectedHydration.flavor
        }
      } else {
        return {
        }
      }
  }

  handleQuantity = async (event) => {
    let quantity = Math.round(event.target.value)
    await this.setState({quantity: event.target.value})
    console.log('quantityFromState', this.state.quantity)
  }

  renderFlavors() {
    return _.map(this.props.hydration.hydration, ({flavor, variantId, productId, title}) => {
      return (
        <button onClick={ () => this.props.selectHydration(variantId)}>{title} - {flavor}</button>
      )
    })
  }

  renderProducts() {
  return _.map(this.props.hydration, ({ title, flavor, price, imageId, productId, variantId, imageSrc}) => {
    return(
      <ul key={imageId}>
        <li>{title}</li>
        <li>{flavor}</li>
        <li>{price}</li>
        <li>{imageId}</li>
        <li>{productId}</li>
        <li>{variantId}</li>
        <li><img src={imageSrc} style={imageStyle}></img></li>
      </ul>
    )
  });
}

render() {
  return (
    <div>
      <div style={divStyle}>
      <h3>{this.selectVariantById(this.props.hydration.variantId).title == undefined ? '' : this.selectVariantById(this.props.hydration.variantId).title }</h3>
      <h3>{this.selectVariantById(this.props.hydration.variantId).flavor == undefined ? '' : this.selectVariantById(this.props.hydration.variantId).flavor}</h3>
      {this.renderFlavors()}
      <img src={this.selectVariantById(this.props.hydration.variantId).imageSrc} style={imageStyle}></img>
      <button onClick={ () => this.props.addToCart(this.props.hydration.variantId, parseInt(this.state.quantity))}>Add to Cart</button>
      <input style={addToCartButton} onChange={(e)=> this.handleQuantity(e)} placeholder="1" type="number" min="1" step="1"/>
      </div>
    </div>
    )
  }
}

  function mapStateToProps({ hydration }) {
  return { hydration };
}

export default connect(mapStateToProps, actions)(Hydration);
