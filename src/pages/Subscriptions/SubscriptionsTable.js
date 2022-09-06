import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const SubscriptionsTable = ({ data, loading, setSingleData, setUpdate, handleVisible }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span>₦ {Number(amount).toLocaleString()}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (description) => description || 'Null',
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
      title: '',
      key: 'description',
      width: 80,
      render: (subscription) => (
        <Button
          onClick={() => {
            setSingleData(subscription)
            handleVisible(true)
          }}
        >
          Edit
        </Button>
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

export default SubscriptionsTable
