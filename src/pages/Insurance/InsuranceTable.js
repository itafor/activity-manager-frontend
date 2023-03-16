import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateInsurance from './UpdateInsurance'

const InsuranceTable = ({ data, loading, handleDelete, categories, companies }) => {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps({
        dataIndex: 'name',
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
      title: 'Banner',
      key: 'id',
      dataIndex: 'banner',
      align: 'center',
      render: (banner) => (
        <Link to={`${banner}`}>
          {banner ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={banner}
              height={60}
              width={60}
              alt='avatar'
            />
          ) : (
            <Avatar style={{ backgroundColor: '#3f8bcaa1' }} icon={<UserOutlined />} size={50} />
          )}
        </Link>
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

    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <div>
            <Button style={{ marginRight: '5px' }} title='View product details'>
              <Link to={`/insurance/details/${singleData?.id}/${singleData?.slug}`}>{'View'}</Link>
            </Button>
            <Button style={{ marginRight: '5px' }} title='Edit insurance'>
              <UpdateInsurance
                insurance={singleData}
                categories={categories}
                companies={companies}
              />
            </Button>
            <Button
              danger
              onClick={() => handleDelete(singleData)}
              title='Permantly delete insurance'
            >
              delete
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
        pagination={data?.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default InsuranceTable