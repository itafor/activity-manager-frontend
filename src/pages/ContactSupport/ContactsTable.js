import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const ContactsTable = ({ data, loading }) => {
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
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      ...getColumnSearchProps({
        dataIndex: 'subject',
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
      title: 'Message',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment) => <span style={{ whiteSpace: 'nowrap' }}> {comment}</span>,
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          <Link to={`/user/details/${user?.id}/${user?.email}`}>
            {user?.first_name} {user?.last_name}
          </Link>
        </span>
      ),
    },

    {
      title: 'Craeted At',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps({
        dataIndex: 'created_at',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
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
        pagination={data?.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default ContactsTable
