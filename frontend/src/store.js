import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

//retrieving info from local storate, the cart items
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

//can access local storate and cart items
const initialState = {
  cart: {cartItems: cartItemsFromStorage},
}

//allowing us to use asyc and await for axios calls for our data from db
const middleware = [thunk]

//allowing us to use dev tools for Redux
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store