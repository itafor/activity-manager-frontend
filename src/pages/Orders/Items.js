import { Avatar, Button, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import { useEffect } from 'react'

const Items = ({ items, loading, order_type }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    console.log('order_type', order_type)
  }, [])
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
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product) => <span style={{ whiteSpace: 'nowrap' }}> {product?.name}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'product',
      key: 'product',
      render: (product) =>
        `₦${
          order_type === 'group'
            ? Number(product?.group_price).toLocaleString()
            : Number(product?.individual_price).toLocaleString()
        }` || 'Null',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      ...getColumnSearchProps({
        dataIndex: 'quantity',
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₦${Number(amount).toLocaleString()}` || 'Null',
    },

    {
      title: 'Image',
      dataIndex: 'product',
      key: 'product',
      align: 'center',
      render: (product) => (
        <Link to={`${product?.id}`}>
          {product?.featured_image ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={product?.featured_image}
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
      title: 'Actions',
      key: 'product',
      dataIndex: 'product',
      align: 'center',
      render: (product) => (
        <>
          <Button style={{ marginRight: '5px' }} title='View product details'>
            <Link to={`/product/details/${product?.id}/${product?.sku}`}>{'View Product'}</Link>
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
        pagination={items.length > 10 ? true : false}
        dataSource={items}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default Items
