import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_BLOCKS } from './types';
import { SELECT_BLOCK } from './types';
import { FETCH_HYDRATION } from './types';
import { FETCH_PROTEIN } from './types';
import { ADD_TO_CART } from './types';
import { REMOVE_FROM_CART } from './types';
import { RECEIVE_PRODUCTS } from './types'
import { GET_PRODUCTS } from './types'


var allProducts = [];

// import { INIT_CART } from './types';

//Traditional Javascript Promise Get Request Function
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({type: FETCH_USER, payload: res}));
//   }
// }

// export const initializeCart = ()  => {
//   let cart = {products: [], total: 0, discountRate: .1, discount: 0}
//
//   return {type: INIT_CART, payload: cart}
// }

export const selectBlock = (variantId, productId) => dispatch => {
  dispatch({
    type: SELECT_BLOCK,
    variantId: variantId,
    productId: productId
  })
}

export const addToCart = (variantId, quantity) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    variantId: variantId,
    quantity: quantity
  })
};

export const removeFromCart = (variantId) => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    variantId: variantId
  })
};

export const fetchBlocks = () => async dispatch => {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:5000/shopify/products/blocks',
  })

  console.log(res.data);
  let blocks = res.data.blocks;
  let images = res.data.images;

  blocks.forEach((block) => {
    let key = block.variantId
    let src = res.data.images[key]
    console.log(key)
    console.log(src)
    block.imageSrc = src;
  })
  console.log('blocksFromServer', blocks);
  allProducts = allProducts.concat(blocks)
  dispatch({type: FETCH_BLOCKS, blocks: blocks});

}

export const fetchHydration = () => async dispatch => {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:5000/shopify/products/hydration',
  })

  console.log(res.data);
  let hydration = res.data.hydration;
  let images = res.data.images;

  hydration.forEach((item) => {
    let key = item.variantId
    let src = res.data.images[key]
    console.log(key)
    console.log(src)
    item.imageSrc = src;
  })
  console.log(hydration);
  allProducts = allProducts.concat(hydration)
  dispatch({type: FETCH_HYDRATION, payload: res.data.hydration});

}

export const fetchProtein = () => async dispatch => {
  const res = await axios({
    method: 'get',
    url: 'http://localhost:5000/shopify/products/protein',
  })

  console.log(res.data);
  let protein = res.data.protein;
  let images = res.data.images;

  protein.forEach((item) => {
    let key = item.variantId
    let src = res.data.images[key]
    console.log(key)
    console.log(src)
    item.imageSrc = src;
  })
  console.log(protein);
  allProducts = allProducts.concat(protein);

  dispatch({type: FETCH_PROTEIN, payload: res.data.protein});
}

export const fetchUser = () => async dispatch => {

    const res =   await axios({
            method: 'get',
            url: 'http://localhost:5000/shopify/customer',
        })

        let shopifyCustomer = res.data

        let user = {
          firstName: shopifyCustomer.first_name,
          lastName: shopifyCustomer.last_name,
          email: shopifyCustomer.email,
          shopifyId: shopifyCustomer.id,
          email: shopifyCustomer.email,
          defaultAddress: shopifyCustomer.defaultAddress
        }

        if (shopifyCustomer.default_address) {
          user.defaultAddress = shopifyCustomer.default_address
        } else {
          user.defaultAddress = null;
        }

        console.log(user);
    dispatch({ type: FETCH_USER, payload: user});
};


  export const getAllProducts = () => dispatch =>  {
    let allProductsByVariantId = {}

    allProducts.forEach(product => {
      allProductsByVariantId[product.variantId] = product;
    })

    console.log('allProductsByVariantId', allProductsByVariantId);
    console.log('allProducts', allProducts);



    dispatch({type: GET_PRODUCTS, payload: allProductsByVariantId})
  }



// export const checkout = products => (dispatch, getState) => {
//   const { cart } = getState()
//
//   dispatch({
//     type: CHECKOUT_REQUEST
//   })
//   shop.buyProducts(products, () => {
//     dispatch({
//       type: CHECKOUT_SUCCESS,
//       cart
//     })
//     // Replace the line above with line below to rollback on failure:
//     // dispatch({ type: types.CHECKOUT_FAILURE, cart })
//   })
// }


// export const handleToken = (token) => async dispatch => {
//   const res = await axios.post('/api/stripe', token);
//
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
//
// export const submitSurvey = (values, history) => async dispatch => {
//   const res = await axios.post('/api/surveys', values);
//
//   history.push('/surveys');
//   // dispatch the new user with updated credits data
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
//
// export const fetchSurveys = () => async dispatch => {
//   const res = await axios.get('/api/surveys');
//
//   dispatch({ type: FETCH_SURVEYS, payload: res.data })
// };
