import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const AppointmentPaymentTable = ({ data, loading, setSingleData, setUpdate, handleVisible }) => {
  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patient',
      key: 'name',
      render: (patient) => <Link to={`/patient/${patient.id}`}>{patient?.full_name}</Link>,
    },
    {
      title: 'Amount Paid',
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
      title: 'Payment Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Paystack ref.',
      dataIndex: 'paystack_ref',
      key: 'paystack_ref',
    },
    {
      title: 'Appointment Fee',
      dataIndex: 'appointment',
      key: 'appointment',
      render: (appointment) => (
        <span>₦ {Number(appointment?.appointment_fee).toLocaleString()}</span>
      ),
    },
    {
      title: 'Appointment Status',
      dataIndex: 'appointment',
      key: 'appointment',
      render: (appointment) => appointment?.appointment_status,
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

export default AppointmentPaymentTable
