import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Menu, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { GrDocumentTime } from 'react-icons/gr'
import { RiUserLine, RiUserHeartLine, RiSettings2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LogoMini from '../assets/images/logo-mini.png'
import Logo from '../assets/logo.svg'

import { toggleCollapseSider } from '../redux/appSlice'
import { AiOutlineLeft } from 'react-icons/ai'
import { BsCreditCard, BsWallet2 } from 'react-icons/bs'
import { BiCategory, BiCreditCard, BiUserPlus } from 'react-icons/bi'
import { CgNotes } from 'react-icons/cg'
import {
  DashboardOutlined,
  UnorderedListOutlined,
  ContactsOutlined,
  BorderRightOutlined,
  CommentOutlined,
  SyncOutlined,
  BranchesOutlined,
  BarcodeOutlined,
  NotificationOutlined,
} from '@ant-design/icons'

const AppSider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(null)
  const { app } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    items.reduce((acc, curr) => {
      if (location.pathname.includes(curr.key)) {
        setCurrentPage(curr.key)
      }
      return acc
    }, 'appointments')
  }, [location.pathname])

  const toggleSiderCollapse = () => {
    dispatch(toggleCollapseSider())
  }

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    }
  }

  const items = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />),
    getItem('Categories', 'categories', <BarcodeOutlined />),
    getItem('Companies', 'companies', <BorderRightOutlined />),
    getItem('Insurances', 'insurances', <GrDocumentTime size={16} />),
    getItem('Lessons', 'lessons', <CgNotes size={16} />),
    getItem('Claims', 'claims', <BranchesOutlined />),
    getItem('Users', 'users', <BiUserPlus size={20} />),
    getItem('Orders', 'orders', <UnorderedListOutlined />),
    getItem('Payments', 'payments', <BiCreditCard size={20} />),
    getItem('Contact-Support', 'contacts', <ContactsOutlined />),
    getItem('Notifications', 'notifications', <NotificationOutlined />),
    getItem('Settings', 'settings', <RiSettings2Line size={16} />),
  ]

  const handleMenuClick = (values) => {
    navigate(`/${values.key}`)
  }

  return (
    <>
      <StyledLogo className='logo'>
        {!app.siderCollapsed ? (
          <img style={{ padding: '8px' }} height={40} src={Logo} alt='aveo' />
        ) : (
          <img style={{ padding: '8px' }} height={40} src={Logo} alt='aveo' />
        )}
        {/* <Typography.Title
          style={{
            display: app.siderCollapsed === true ? 'none' : 'block',
            whiteSpace: 'nowrap',
          }}
          level={5}
        >
          {' '}
          XPro{' '}
        </Typography.Title> */}
      </StyledLogo>
      <Menu
        theme='light'
        mode='inline'
        selectedKeys={currentPage}
        items={items}
        style={{ height: 'calc(100vh - 95px)' }}
        onClick={handleMenuClick}
      />
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          justifyContent: 'center',
          color: 'white',
        }}
        icon={
          <AiOutlineLeft
            style={{ transform: app.siderCollapsed && 'rotate(180deg)' }}
            size={18}
            fill='white'
            color='white'
          />
        }
        block
        type='primary'
        onClick={toggleSiderCollapse}
      >
        {!app.siderCollapsed && 'Collapse'}
      </Button>
    </>
  )
}

export default AppSider
// background-color: #2e338a;

const StyledLogo = styled.div`
  display: flex;
  color: white;
  align-content: center;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #2e338a;
  h5 {
    color: white;
  }
`
