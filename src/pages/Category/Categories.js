import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCategory, getAllCategories } from '../../redux/categorySlice'
import CreateCategory from './CreateCategory'
import CategoryTable from './CategoryTable'

const Categories = () => {
  const { categories } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected categery?')) {
      return
    }

    dispatch(deleteCategory(id))
      .then((response) => {
        if (response.type === 'category/delete/fulfilled') {
          dispatch(getAllCategories())
          notification.success({
            message: ' category deleted successfully',
          })
        } else if (response.type === 'category/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting category, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting category, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='Createcategory'>
            <CreateCategory />,
          </Button>,
        ]}
        title='Categories'
      />
      <CategoryTable
        data={categories.data}
        loading={categories.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Categories