import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCollapseSider, toggleSiderHidden } from '../redux/appSlice'
import { logout } from '../redux/authSlice'

const AppHeader = () => {
  const dispatch = useDispatch()
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)
  const { siderHidden, siderCollapsed } = useSelector((state) => state.app)

  useEffect(() => {
    function handleResize() {
      setDeviceWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(
    () => {
      // if (deviceWidth <= 640 && siderHidden === false) {
      //   dispatch(toggleSiderHidden())
      // }
      if (deviceWidth < 1024 && deviceWidth > 640 && siderHidden) {
        dispatch(toggleSiderHidden(false))
        dispatch(toggleCollapseSider(true))
      }
      if (deviceWidth < 1024 && !siderCollapsed) {
        dispatch(toggleCollapseSider(true))
      }
      if (deviceWidth >= 1024 && siderCollapsed === true) {
        dispatch(toggleCollapseSider(false))
      }
    },
    // eslint-disable-next-line
    [deviceWidth],
  )

  return (
    <header
      className='site-layout-background'
      style={{
        display: 'flex',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h1>SchoolPal </h1>
      <Button type='primary' onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </header>
  )
}

export default AppHeader
