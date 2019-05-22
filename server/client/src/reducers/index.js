import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import userReducer from './userReducer';
import blocksReducer from './blocksReducer';
import hydrationReducer from './hydrationReducer';
import proteinReducer from './proteinReducer';
import cartReducer, * as fromCart from './cartReducer';
import productsReducer, * as fromProducts from './productsReducer';

export default combineReducers({
  user: userReducer,
  blocks: blocksReducer,
  hydration: hydrationReducer,
  protein: proteinReducer,
  cart: cartReducer,
  products: productsReducer
});
