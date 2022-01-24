import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const maxPrice = Math.max(...action.payload.map((item) => item.price))

    return {
      ...state,
      allProducts: [...action.payload],
      filtredProducts: [...action.payload],
      filters: { ...state.filters, price: maxPrice, maxPrice: maxPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtredProducts } = state
    let tempProducts = [...filtredProducts]
    if (sort === 'price(lowest)') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price(highest)') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name(a-z)') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name(z-a)') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtredProducts: tempProducts }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      ...state.filters,
      filters: {
        text: ' ',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        shipping: false,
      },
    }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
