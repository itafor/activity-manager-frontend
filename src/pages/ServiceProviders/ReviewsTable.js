import { Table } from 'antd'
import moment from 'moment'
import React from 'react'

const ReviewsTable = ({ data, loading, parent }) => {
  const columns = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (client) => client?.first_name,
      width: 200,
    },
    {
      title: 'Rating',
      dataIndex: 'star_rating_count',
      key: 'star_rating_count',
      width: 100,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    // {
    //   title: 'Category',
    //   dataIndex: 'category',
    //   key: 'category',
    //   render: (category) => category?.name,
    // },
    // {
    //   title: 'Starting Price',
    //   dataIndex: 'starting_price',
    //   key: 'starting_price',
    //   render: (starting_price) => `₦${Number(starting_price).toLocaleString()}`,
    // },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
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

export default ReviewsTable
