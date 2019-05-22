import { FETCH_PROTEIN } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PROTEIN:
      return action.payload || false;
    default:
      return state;
  }
}
