import { FETCH_BLOCKS } from '../actions/types'
import { SELECT_BLOCK } from '../actions/types'


const initialState = {
  productId: null,
  variantId: null,
  blocks: [],
}

const blocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOCKS:
      const { blocks, variantId, productId } = action
      console.log('blocksFromAction', blocks)
      return {
        blocks: blocks,
        productId: blocks[0].productId,
        variantId: blocks[0].variantId,
      }
    case SELECT_BLOCK:
      const variantId2 = action.variantId
      const productId2 = action.productId
      return {
        blocks: state.blocks,
        productId: productId2,
        variantId: variantId2,
      }
    default:
      return state
}
}

export default blocksReducer;

// const blocks = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_BLOCKS:
//       const { blocks, variantId, productId } = action
//       console.log('blocksFromAction', blocks)
//       return {
//         blocks: blocks,
//         productId: null,
//         variantId: null,
//       }
//     default:
//       return state
//   }
// }

// const productId = (state = initialState.productId, action) => {
//   switch (action.type) {
//     case SELECT_BLOCK:
//       const { productId } = action
//       return productId
//     default:
//       return state
//   }
// }
//
// const variantId = (state = initialState.variantId, action) => {
//   switch (action.type) {
//     case SELECT_BLOCK:
//       const { variantId } = action
//       return variantId
//     default:
//       return state
//   }
// }
//
// const blocksReducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return {
//         productId: productId(state.productId, action),
//         variantId: variantId(state.variantId, action),
//         blocks: blocks(state.blocks, action)
//       }
//   }
// }
