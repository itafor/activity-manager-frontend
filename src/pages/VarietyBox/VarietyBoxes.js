import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteServiceCategory, getAllServiceCategory } from '../../redux/serviceCategorySlice'
import { deleteProduct, getAllProducts } from '../../redux/productSlice'
import ProductDatatable from './ProductDatatable'
import { Link } from 'react-router-dom'
import ProductTable from './ProductTable'

const VarietyBoxes = () => {
  const { serviceCategory } = useSelector((state) => state)
  const { products } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllServiceCategory())
  }, [])

  const handleDelete = ({ id }) => {
    // alert('id', id)
    // return
    if (!window.confirm('Do You want to permanently delete the selected product?')) {
      return
    }

    dispatch(deleteProduct(id))
      .then((response) => {
        if (response.type === 'product/delete/fulfilled') {
          dispatch(getAllProducts())
          notification.success({
            message: ' Product deleted successfully',
          })
        } else if (response.type === 'product/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting product, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting service category, please try again later',
        })
      })
  }

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='createProduct'>
            <Link to='/variety-Box/create'>Create Variety Box </Link>
          </Button>,
        ]}
        title='Varitey boxes'
      />
      {/* <ProductDatatable products={products.data} handleDelete={handleDelete} /> */}
      <ProductTable data={products.data} loading={products.loading} handleDelete={handleDelete} />
    </div>
  )
}

export default VarietyBoxes
