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

class Protein extends Component {
  constructor(props) {
    super(props)
    this.props.fetchProtein();
    this.state = {
      quantity: 1
    }
  }

  componentDidMount() {
    this.props.fetchProtein();
  }

  selectVariantById(id) {
    console.log('this.props.protein.protein', this.props.protein.protein)
    console.log('this.props.protein.variantId', this.props.protein.variantId)
    console.log('id', id)
    let selectedProtein
    this.props.protein.protein.forEach(protein => {
      if (protein.variantId == id) selectedProtein = protein
    })
      console.log("selectedProtein:", selectedProtein)
      if (selectedProtein) {
        return {
          title: selectedProtein.title,
          imageSrc: selectedProtein.imageSrc,
          flavor: selectedProtein.flavor
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
    return _.map(this.props.protein.protein, ({flavor, variantId, productId, title}) => {
      return (
        <button onClick={ () => this.props.selectProtein(variantId)}>{title} - {flavor}</button>
      )
    })
  }


  renderProducts() {
  return _.map(this.props.protein, ({ title, flavor, price, imageId, productId, variantId, imageSrc}) => {
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
      <h3>{this.selectVariantById(this.props.protein.variantId).title == undefined ? '' : this.selectVariantById(this.props.protein.variantId).title }</h3>
      <h3>{this.selectVariantById(this.props.protein.variantId).flavor == undefined ? '' : this.selectVariantById(this.props.protein.variantId).flavor}</h3>
      {this.renderFlavors()}
      <img src={this.selectVariantById(this.props.protein.variantId).imageSrc} style={imageStyle}></img>
      <button onClick={ () => this.props.addToCart(this.props.protein.variantId, parseInt(this.state.quantity))}>Add to Cart</button>
      <input style={addToCartButton} onChange={(e)=> this.handleQuantity(e)} placeholder="1" type="number" min="1" step="1"/>
      </div>
    </div>
    )
  }
}
  function mapStateToProps({ protein }) {
  return { protein };
}

export default connect(mapStateToProps, actions)(Protein);
