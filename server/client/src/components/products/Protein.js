import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const imageStyle = {
  width: '100px',
  height: '100px'
};

class Protein extends Component {
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
      <div> {this.renderProducts()} </div>
    )
  }
}
  function mapStateToProps({ protein }) {
  return { protein };
}

export default connect(mapStateToProps)(Protein);
