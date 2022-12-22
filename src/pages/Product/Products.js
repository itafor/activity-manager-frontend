import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteServiceCategory, getAllServiceCategory } from '../../redux/serviceCategorySlice'
import { getAllProducts } from '../../redux/productSlice'
import ProductDatatable from './ProductDatatable'
import { Link } from 'react-router-dom'

const Products = () => {
  const { serviceCategory } = useSelector((state) => state)
  const { products } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllServiceCategory())
  }, [])
  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected category?')) {
      return
    }

    dispatch(deleteServiceCategory(id))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'serviceCategory/delete/fulfilled') {
          dispatch(getAllServiceCategory())
          notification.success({
            message: ' Category deleted successfully',
          })
        } else if (response.type === 'serviceCategory/delete/rejected') {
          notification.error({
            message:
              response?.payload?.message || 'Error deleting service category, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
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
            <Link to='/product/create'>Create Product </Link>
          </Button>,
        ]}
        title='Products'
      />
      <ProductDatatable products={products.data} handleDelete={handleDelete} />
    </div>
  )
}

export default Products
