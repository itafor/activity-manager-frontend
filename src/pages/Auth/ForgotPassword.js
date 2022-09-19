import { Form, Input, Button, Typography, Row, Col, Space, Avatar, notification } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo512 from '../../assets/images/logo512.png'
import Logo192 from '../../assets/images/logo192.png'
import { useDispatch } from 'react-redux'
import { sendOTP } from '../../redux/authSlice'

const ForgotPassword = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = (value) => {
    setLoading(true)
    dispatch(sendOTP(value)).then((response) => {
      if (response.type === 'auth/sendOTP/fulfilled') {
        notification.success({ message: 'OTP successfully sent to your email' })
        navigate('/reset-confirmation')
        setLoading(false)
      } else {
        notification.error({ message: 'Error sending OTP, Please try again later' })
        setLoading(false)
      }
    })
  }
  return (
    <LoginContainer>
      <div className='logo'>
        <picture>
          <source sizes='24' srcSet={Logo512} media='(min-width: 600px)' />
          <source sizes='24' srcSet={Logo192} media='(min-width: 300px)' />
          <img alt='Xpro' />
        </picture>
        <Typography.Title style={{ textAlign: 'center' }} level={4}>
          {' '}
        </Typography.Title>
        <Typography.Title level={2}>Forgot Password?</Typography.Title>
        <Typography.Paragraph>
          Enter the email address you used when you joined and we’ll send you instructions to reset
          your password.
        </Typography.Paragraph>
        <br />
      </div>
      <Form
        requiredMark='optional'
        form={form}
        onFinish={onFinish}
        name='multi-form'
        layout='vertical'
        autoComplete='false'
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please enter your email address',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
          label='Email '
          name='email'
        >
          <Input size='large' placeholder='Email' autoComplete={'off'} />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} size='large' htmlType='submit' type='primary' block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className='no-account'>
        <Typography.Text className='forgot-password' type='secondary'>
          Return to{' '}
          <Typography.Text strong type='link'>
            <Link className='create-account' to='/login'>
              Login
            </Link>
          </Typography.Text>
        </Typography.Text>
      </div>
    </LoginContainer>
  )
}

export default ForgotPassword

const LoginContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  padding: 2rem;
  width: 100%;

  background-color: white;
  border-radius: 0.5rem;

  .logo img {
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 150px;
    margin: 0 auto;
  }

  @media (min-width: 600px) {
    padding: 3rem;
    width: 500px;
  }

  a .forgot-password {
    color: red;
    font-size: 0.75rem;
  }

  .no-account {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;

    a .create-account {
      font-size: 1rem;
      white-space: nowrap;
    }
  }
`
