import {
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../actions/types'

// import { allProducts } from '../actions'

const initialState = {
  addedIds: [],
  quantityById: {},
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.variantId) !== -1) {
        return state
      }
      return [ ...state, action.variantId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { variantId, quantity } = action
      return { ...state,
        [variantId]: (state[variantId] || 0) + quantity
      }
    default:
      return state
  }
}

const removeAddedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case REMOVE_FROM_CART:
      const { variantId } = action
      let i = state.indexOf(variantId)
      return [...state.slice(0, i), ...state.slice(i +1)]
    default:
      return state
  }
}

const removeQuantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case REMOVE_FROM_CART:
      const { variantId } = action
      return { ...state,
        [variantId]: 0
      }
    default:
      return state
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
    case REMOVE_FROM_CART: {
      return {
        addedIds: removeAddedIds(state.addedIds, action),
        quantityById: removeQuantityById(state.quantityById, action)
      }
    }
    default:
      return state
  }
}

export default cart;
