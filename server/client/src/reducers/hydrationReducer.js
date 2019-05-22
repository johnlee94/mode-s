import { FETCH_HYDRATION } from '../actions/types'
import { SELECT_HYDRATION } from '../actions/types'


const initialState = {
  productId: null,
  variantId: null,
  hydration: [],
}

const hydrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HYDRATION:
      const { hydration, variantId, productId } = action
      console.log('hydrationFromAction', hydration)
      return {
        hydration: hydration,
        productId: hydration[0].productId,
        variantId: hydration[0].variantId,
      }
    case SELECT_HYDRATION:
      const variantId2 = action.variantId
      const productId2 = action.productId
      return {
        hydration: state.hydration,
        productId: productId2,
        variantId: variantId2,
      }
    default:
      return state
}
}

export default hydrationReducer;
