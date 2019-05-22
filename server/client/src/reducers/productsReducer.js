import { GET_PRODUCTS } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload || false;
    default:
      return state;
  }
}
