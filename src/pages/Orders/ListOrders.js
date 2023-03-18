import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllOrders } from '../../redux/orderSlice'
import OrderTable from './OrderTable'
import { OrderService } from '../../services/OrderService'

const ListOrders = () => {
  const { orders } = useSelector((state) => state)
  const dispatch = useDispatch()
  // const [orders, setOrders] = useState([])

  useEffect(() => {
    dispatch(getAllOrders())
    console.log('all list_orders', orders)
    // OrderService.getAll()
    //   .then((res) => {
    //     console.log('ORDERS', res)
    //     setOrders(res)
    //   })
    //   .catch((err) => {
    //     console.log('order response'.err)
    //   })
  }, [])

  return (
    <div>
      <PageHeader extra={[]} title='Orders' />
      <OrderTable data={orders.data} loading={orders.loading} />
    </div>
  )
}

export default ListOrders
