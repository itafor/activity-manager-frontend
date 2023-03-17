import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const ClaimTable = ({ data, loading }) => {
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
      title: 'Policy number',
      dataIndex: 'policy_number',
      key: 'policy_number',
      ...getColumnSearchProps({
        dataIndex: 'policy_number',
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
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps({
        dataIndex: 'status',
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
      title: 'Incident Date',
      dataIndex: 'incident_date',
      key: 'incident_date',
      ...getColumnSearchProps({
        dataIndex: 'incident_date',
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

    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {user && user?.first_name} {user && user?.last_name}
        </span>
      ),
    },

    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <span style={{ whiteSpace: 'nowrap' }}> {category && category?.name}</span>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (company) => (
        <span style={{ whiteSpace: 'nowrap' }}> {company && company?.name}</span>
      ),
    },

    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <div>
            <Button style={{ marginRight: '5px' }} title='View claim details'>
              <Link to={`/claim/details/${singleData?.id}/${singleData?.policy_number}`}>
                {'View'}
              </Link>
            </Button>
          </div>
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

export default ClaimTable
