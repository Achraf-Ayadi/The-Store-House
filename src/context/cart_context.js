import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'
import { useFilterContext } from './filter_context'
import { useProductsContext } from './products_context'

const initialState = {
  cart: [],
  totalItem: 0,
  totalAmount: 0,
  shippingfree: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (id, color, amount, singleProduct) => {
    // console.log(singleProduct)
    dispatch({ type: ADD_TO_CART, payload: {id, color, amount, singleProduct} })
  }

  const removeItem = () => {}
  const toggleItemAmount = () => {}
  const clearCart = () => {}
  return (
    <CartContext.Provider
      value={{ ...state, removeItem, clearCart, toggleItemAmount, addToCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
