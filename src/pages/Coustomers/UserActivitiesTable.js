import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import AddIndividualActivity from './AddIndividualActivity'
import EditIndividualActivity from './EditIndividualActivity'
// import UpdateGlobalActivity from './UpdateGlobalActivity'

const UserActivitiesTable = ({ data, loading, handleDelete, user_name, user }) => {
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps({
        dataIndex: 'title',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps({
        dataIndex: 'description',
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
      title: 'Image',
      key: 'id',
      dataIndex: 'image_url',
      align: 'center',
      render: (image_url) => (
        <Link to={`${image_url}`}>
          {image_url ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={image_url}
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
      title: 'Activity type',
      dataIndex: 'activity_type',
      key: 'activity_type',
      ...getColumnSearchProps({
        dataIndex: 'activity_type',
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
      title: 'Activity Date',
      dataIndex: 'activity_date',
      key: 'activity_date',
      ...getColumnSearchProps({
        dataIndex: 'activity_date',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (activity_date) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(activity_date).format('DD MMM YYYY')}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <Button style={{ marginRight: '5px' }} title={`Edit activity for ${user_name}`}>
            {/* <UpdateGlobalActivity activity={singleData} /> */}
            <EditIndividualActivity user_name={user_name} user={user} activity={singleData} />
          </Button>
          <Button
            danger
            onClick={() => handleDelete(singleData)}
            title={`Delete activity for ${user_name}`}
          >
            delete
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

export default UserActivitiesTable
