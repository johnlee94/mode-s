import React, { Component } from 'react';
import Blocks from './Blocks'
import Hydration from './Hydration'
import Protein from './Protein'

class Products extends Component {
  render() {
    return (
      <div>
        <Blocks />
        <Hydration />
        <Protein />
      </div>
    )
  }
}

export default Products;
