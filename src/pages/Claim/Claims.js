import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllClaims } from '../../redux/claimSlice'
import ClaimTable from './ClaimTable'

const Claims = () => {
  const { claims } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllClaims())
    console.log('claims', claims)
  }, [])

  return (
    <div>
      <PageHeader extra={[]} title='Claims' />
      <ClaimTable data={claims.data} loading={claims.loading} />
    </div>
  )
}

export default Claims
