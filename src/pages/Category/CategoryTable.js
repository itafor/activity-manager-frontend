import { Button, Table } from 'antd'
import moment from 'moment'
import React from 'react'

const CategoryTable = ({
  data,
  loading,
  setSingleData,
  setUpdate,
  handleVisible,
  handleDelete,
  deleteLoading,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => description || 'Null',
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },
    {
      title: '',
      key: 'description',
      width: 200,
      render: (category) => (
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <Button
            danger
            loading={deleteLoading}
            onClick={() => {
              handleDelete(category)
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setSingleData(category)
              handleVisible(true)
            }}
          >
            Edit
          </Button>
        </div>
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

export default CategoryTable
