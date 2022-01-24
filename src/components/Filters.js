import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    allProducts,
    filters: {
      text,
      category,
      company,
      color,
      price,
      maxPrice,
      minPrice,
      shipping,
    },
    updateFilter,
    filterProducts,
    clearFilter,
  } = useFilterContext()

  const Categories = getUniqueValues(allProducts, 'category')
  const companies = getUniqueValues(allProducts, 'company')
  const colors = getUniqueValues(allProducts, 'colors')

  // console.log(colors)

  return (
    <Wrapper>
      <div className='content'>
        <form>
          <div className='form-control' onSubmit={(e) => e.preventDefault}>
            <input
              type='text'
              name='text'
              className='search-input'
              placeholder='search'
              value={text}
              onChange={updateFilter}
            />
          </div>
          <div className='form-content'>
            <h5>category</h5>
            {Categories.map((c, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  name='category'
                  className={`${
                    category === c.toLowerCase() ? 'active' : null
                  }`}
                  onClick={updateFilter}
                >
                  {c}
                </button>
              )
            })}
          </div>
          <div className='form-content'>
            <h5>company</h5>
            <select
              name='company'
              id='company'
              className='company'
              onChange={updateFilter}
            >
              {companies.map((c, index) => {
                return (
                  <option
                    key={index}
                    name='company'
                    // id='company'
                    value={c}
                  >
                    {c}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-content'>
            <h5>Colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name='color'
                      type='button'
                      onClick={updateFilter}
                      data-color={c}
                      className={`${
                        color === c ? 'active all-btn ' : 'all-btn'
                      }`}
                    >
                      {c}
                    </button>
                  )
                }
                return (
                  <button
                    key={index}
                    name='color'
                    type='button'
                    data-color={c}
                    style={{ backgroundColor: c }}
                    onClick={updateFilter}
                    className={`${
                      color === c ? ' color-btn active' : 'color-btn'
                    }`}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                )
              })}
            </div>
            <div className='form-content'>
              <h5>price</h5>
              <p className='price'>{formatPrice(price)}</p>
              <input
                type='range'
                name='price'
                value={price}
                max={maxPrice}
                min={minPrice}
                onChange={updateFilter}
              />
            </div>
          </div>
          <div className='form-content shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              value={shipping}
              onChange={updateFilter}
            />
          </div>
        </form>
        <button className='clear-btn' type='button' onClick={clearFilter}>
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
