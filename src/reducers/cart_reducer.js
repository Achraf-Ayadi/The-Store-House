import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, singleProduct, amount } = action.payload
    const tempItem = state.cart.find((item) => item.id === id + color)

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: singleProduct.name,
        color,
        amount,
        image: singleProduct.images[0].url,
        price: singleProduct.price,
        max: singleProduct.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
