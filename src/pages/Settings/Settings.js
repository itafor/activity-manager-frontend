import { PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../redux/profileSlice'
import ProfileInfo from './ProfileInfo'

const Settings = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  return (
    <div>
      <PageHeader title='Settings' />
      <ProfileInfo />
    </div>
  )
}

export default Settings
