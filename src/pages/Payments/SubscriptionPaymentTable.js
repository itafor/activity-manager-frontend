import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const SubscriptionPaymentTable = ({ data, loading, setSingleData, setUpdate, handleVisible }) => {
  const columns = [
    {
      title: 'Subscription Plan',
      dataIndex: 'subscription_plan',
      key: 'subscription_plan',
      render: (subscription) => subscription?.name,
    },
    {
      title: 'Physician Name',
      dataIndex: 'physician',
      key: 'name',
      render: (physician) => (
        <Link to={`/physicians/${physician?.id}`}>{physician?.full_name}</Link>
      ),
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
      render: (description) => description || 'Null',
    },
    {
      title: 'Paystack Ref.',
      dataIndex: 'paystack_ref',
      key: 'paystack_ref',
      width: 300,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
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

export default SubscriptionPaymentTable
