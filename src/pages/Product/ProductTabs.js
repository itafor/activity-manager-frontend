import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import ProductDatatable from './ProductDatatable'

import ProductImages from './ProductImages'

function ProductTabs({ product_Images, products }) {
  return (
    <Tabs defaultActiveKey='image' id='uncontrolled-tab-example' className='mb-3'>
      <Tab eventKey='image' title='Other Images'>
        <ProductImages images={product_Images} />
      </Tab>

      <Tab eventKey='related_products' title='Related products'>
        {products ? <ProductDatatable products={products} /> : 'No related products found'}
      </Tab>
    </Tabs>
  )
}

export default ProductTabs
