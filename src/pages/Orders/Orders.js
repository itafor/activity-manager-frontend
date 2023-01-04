import { PageHeader } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../redux/orderSlice'
import OrderTable from './OrderTable'

function Orders() {
  const { orders } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders())
    console.log('orders', orders)
  }, [])
  return (
    <div>
      <PageHeader extra={[]} title='Orders' />
      <OrderTable data={orders.data} loading={orders.loading} />
    </div>
  )
}
export default Orders
