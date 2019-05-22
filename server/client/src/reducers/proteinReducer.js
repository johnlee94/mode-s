import { FETCH_PROTEIN } from '../actions/types'
import { SELECT_PROTEIN } from '../actions/types'


const initialState = {
  productId: null,
  variantId: null,
  protein: [],
}

const proteinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROTEIN:
      const { protein, variantId, productId } = action
      console.log('proteinFromAction', protein)
      return {
        protein: protein,
        productId: protein[0].productId,
        variantId: protein[0].variantId,
      }
    case SELECT_PROTEIN:
      const variantId2 = action.variantId
      const productId2 = action.productId
      return {
        protein: state.protein,
        productId: productId2,
        variantId: variantId2,
      }
    default:
      return state
}
}

export default proteinReducer;
