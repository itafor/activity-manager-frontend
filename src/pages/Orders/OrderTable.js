import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const OrderTable = ({ data, loading }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'order_type',
      key: 'order_type',
      ...getColumnSearchProps({
        dataIndex: 'order_type',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },
    {
      title: 'Amount',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `₦${Number(total).toLocaleString()}` || 'Null',
    },
    {
      title: 'Payment status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      ...getColumnSearchProps({
        dataIndex: 'payment_status',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },

    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => <span style={{ whiteSpace: 'nowrap' }}> {items?.length} items</span>,
    },

    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <Button style={{ marginRight: '5px' }} title='View product details'>
            <Link to={`/order/details/${singleData?.id}`}>{'View'}</Link>
          </Button>
        </>
      ),
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        pagination={data.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default OrderTable
