import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtredProducts, gridView } = useFilterContext()
  if (filtredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        sorry, no products matched your search
      </h5>
    )
  }
  if (gridView) {
    return <GridView products={filtredProducts} />
  }
  return <ListView products={filtredProducts} />
}

export default ProductList
