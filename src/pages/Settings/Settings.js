import { PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../redux/profileSlice'
import ProfileInfo from './ProfileInfo'
import SettingsTabs from './SettingsTabs'

const Settings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  return (
    <div>
      <PageHeader title='Settings' />
      <ProfileInfo />
      <SettingsTabs />
    </div>
  )
}

export default Settings
