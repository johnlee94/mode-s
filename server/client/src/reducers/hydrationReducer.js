import { FETCH_HYDRATION } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_HYDRATION:
      return action.payload || false;
    default:
      return state;
  }
}
