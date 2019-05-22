import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';


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

class Blocks extends Component {
  constructor(props) {
    super(props)
    this.props.fetchBlocks();
    this.state = {
      quantity: 1
    }
  }

  componentDidMount() {
    this.props.fetchBlocks();
  }

  selectVariantById(id) {
    console.log('this.props.blocks.blocks', this.props.blocks.blocks)
    console.log('this.props.blocks.variantId', this.props.blocks.variantId)
    console.log('id', id)
    let selectedBlock
    this.props.blocks.blocks.forEach(block => {
      if (block.variantId == id) selectedBlock = block
    })
      console.log("selectedBlock:", selectedBlock)
      if (selectedBlock) {
        return {
          title: selectedBlock.title,
          imageSrc: selectedBlock.imageSrc,
          flavor: selectedBlock.flavor
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
    return _.map(this.props.blocks.blocks, ({flavor, variantId, productId}) => {
      return (
        <button onClick={ () => this.props.selectBlock(variantId, productId)}>{flavor}</button>
      )
    })
  }

  renderProducts() {
    console.log('blocksFromReducer', this.props.blocks)
    console.log('products from blocksFromReducer', this.props.blocks.blocks)
  return _.map(this.props.blocks.blocks, ({ title, flavor, price, imageId, productId, variantId, imageSrc}) => {
    return(
      <ul key={imageId} style={listStyle}>
        <li>{title}</li>
        <select>
          <option>10-pack</option>
        </select>
        <li>{flavor}</li>
        <li>{price}</li>
        <li>{imageId}</li>
        <li>{productId}</li>
        <li>{variantId}</li>
        <li><img src={imageSrc} style={imageStyle}></img></li>
        <button onClick={ () => this.props.selectBlock(variantId, productId)}>Select Block</button>
      </ul>
    )
  });
}

// {this.renderProducts()}
// <h4>{this.props.blocks.productId}</h4>
// <h4>{this.props.blocks.variantId}</h4>
  render() {
    return (
      <div>
        <div style={divStyle}>
        <h3>{this.selectVariantById(this.props.blocks.variantId).title == undefined ? '' : this.selectVariantById(this.props.blocks.variantId).title }</h3>
        <h3>{this.selectVariantById(this.props.blocks.variantId).flavor == undefined ? '' : this.selectVariantById(this.props.blocks.variantId).flavor}</h3>
        {this.renderFlavors()}
        <img src={this.selectVariantById(this.props.blocks.variantId).imageSrc} style={imageStyle}></img>
        <button onClick={ () => this.props.addToCart(this.props.blocks.variantId, parseInt(this.state.quantity))}>Add to Cart</button>
        <input style={addToCartButton} onChange={(e)=> this.handleQuantity(e)} placeholder="1" type="number" min="1" step="1"/>
        </div>
      </div>
    )
  }
  // {this.renderProducts()}
}
// if(blocks.blocks.length > 0) {
//
//   return { blocks };
// } else {
//   return {
//     productId: null,
//     variantId: null,
//     blocks: [],
//   }
// }
  function mapStateToProps({ blocks }) {
    return({blocks});
}

export default connect(mapStateToProps, actions)(Blocks);
