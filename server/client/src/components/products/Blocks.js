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
  marginLeft: "30px"
}

const addToCartButton = {
  maxWidth: '100px'
}

class Blocks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
  }

  componentDidMount() {
    this.props.fetchBlocks();
  }

  selectVariantById(id) {
    let selectedBlock
    this.props.blocks.blocks.forEach(block => {
      if (block.variantId == id) selectedBlock = block
    })
      console.log("selectedBlock:", selectedBlock)
    return {
      title: selectedBlock.title,
      imageSrc: selectedBlock.imageSrc,
      flavor: selectedBlock.flavor
    }
  }

  handleQuantity = async (event) => {
    await this.setState({quantity: event.target.value})
    console.log('quantityFromState', this.state.quantity)
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
  render() {
    return (
      <div>
        <div style={divStyle}>
        <h4>{this.props.blocks.productId}</h4>
        <h4>{this.props.blocks.variantId}</h4>
        <h3>{this.selectVariantById(this.props.blocks.variantId).title}</h3>
        <h3>{this.selectVariantById(this.props.blocks.variantId).flavor}</h3>
        <img src={this.selectVariantById(this.props.blocks.variantId).imageSrc} style={imageStyle}></img>
        <button style={addToCartButton} onClick={ () => this.props.addToCart(this.props.blocks.variantId, parseInt(this.state.quantity))}>Add to Cart</button>
        <input onChange={(e)=> this.handleQuantity(e)} placeholder="1" type="number" min="0"/>
        {this.renderProducts()}
        </div>
      </div>
    )
  }
}
  function mapStateToProps({ blocks }) {
  return { blocks };
}

export default connect(mapStateToProps, actions)(Blocks);
