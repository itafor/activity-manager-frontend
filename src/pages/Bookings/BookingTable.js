import { Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

const BookingTable = ({ data, loading, parent }) => {
  const columns = [
    {
      title: 'Patient Name',
      key: 'patient_name',
      hidden: parent === 'patient' && true,
      render: (appointment) => (
        <Link to={`/patients/${appointment?.patient?.id}`}>
          {appointment?.patient_type === 'Me'
            ? appointment?.patient?.full_name
            : appointment?.patient_name}
        </Link>
      ),
    },
    {
      title: 'Appointed Physician',
      dataIndex: 'physician_id',
      key: 'physician_id',
      render: (physician_id) => <Link to={`/physicians/${physician_id}`}>{physician_id}</Link>,
      hidden: parent === 'physician' && true,
    },
    {
      title: 'Patient Type',
      dataIndex: 'patient_type',
      key: 'patient_type',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      render: (appointment_date) => moment(appointment_date, 'YYYY-MM-DD').format('MMM Do YYYY'),
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
    },
    {
      title: 'Appointment Fee',
      dataIndex: 'appointment_fee',
      key: 'appointment_fee',
      render: (appointment_fee) => <span>₦ {Number(appointment_fee).toLocaleString()} </span>,
    },
    {
      title: 'Status',
      dataIndex: 'appointment_status',
      key: 'appointment_status',
      sorter: (a, b) => String(a?.appointment_status).localeCompare(String(b?.appointment_status)),
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      sorter: (a, b) => String(a?.payment_status).localeCompare(String(b?.payment_status)),
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },
  ].filter((item) => !item.hidden)

  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        pagination={data?.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default BookingTable
