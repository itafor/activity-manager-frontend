import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteInsurance, getAllInsurances } from '../../redux/InsuranceSlice'
import CreateInsurance from './CreateInsurance'
import InsuranceTable from './InsuranceTable'
import { getAllCategories } from '../../redux/categorySlice'
import { getAllCompanies } from '../../redux/companySlice'

const Insurances = () => {
  const { insurances } = useSelector((state) => state)
  const { categories } = useSelector((state) => state)
  const { companies } = useSelector((state) => state)

  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllInsurances())
    dispatch(getAllCategories())
    dispatch(getAllCompanies())
    console.log('categorie test', categories)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected insurance?')) {
      return
    }

    dispatch(deleteInsurance(id))
      .then((response) => {
        if (response.type === 'insurance/delete/fulfilled') {
          dispatch(getAllInsurances())
          notification.success({
            message: ' insurance deleted successfully',
          })
        } else if (response.type === 'insurance/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting insurance, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting insurance, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='CreateInsurance'>
            <CreateInsurance categories={categories.data} companies={companies.data} />,
          </Button>,
        ]}
        title='Insurances'
      />
      <InsuranceTable
        data={insurances.data}
        loading={insurances.loading}
        handleDelete={handleDelete}
        categories={categories.data}
        companies={companies.data}
      />
    </div>
  )
}

export default Insurances
