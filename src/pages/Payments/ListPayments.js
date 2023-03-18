import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserTable from './PaymentTable'
import { getAllPayments } from '../../redux/paymentSlice'
import PaymentTable from './PaymentTable'

const ListPayments = () => {
  const { payments } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllPayments())
    console.log('payments', payments)
  }, [])

  return (
    <div>
      <PageHeader extra={[]} title='Payments' />
      <PaymentTable data={payments.data} loading={payments.loading} />
    </div>
  )
}

export default ListPayments
