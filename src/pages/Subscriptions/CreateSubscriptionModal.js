import { Form, Modal, Input, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createSubscription,
  editSubscription,
  getAllSubscriptions,
} from '../../redux/subscriptionSlice'

const CreateSubscriptionModal = ({ visibility, handleVisible, update, singleData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  // form.setFieldValue({ ...singleData });
  const handleOk = () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(false)
        form.submit()
      })
      .catch((info) => {
        setConfirmLoading(false)
      })
  }

  const handleFinish = (values) => {
    console.log(values)
    setConfirmLoading(true)

    if (update)
      dispatch(editSubscription({ ...values, subscriptionPlanId: singleData?.id }))
        .then((response) => {
          setConfirmLoading(false)
          if (response.type === 'subscription/edit/fulfilled') {
            dispatch(getAllSubscriptions())
            handleVisible()
            notification.success({
              message: 'Subscription updated successfully',
            })
          } else if (response.type === 'subscription/edit/rejected') {
            handleVisible()
            notification.error({
              message:
                response?.payload?.message || 'Error updating subscription, please try again',
            })
          }
        })
        .catch((error) => {
          setConfirmLoading(false)
          notification.error({
            message: 'Error updating subscription, please try again later',
          })
        })
    else
      dispatch(createSubscription(values))
        .then((response) => {
          setConfirmLoading(false)
          if (response.type === 'subscription/create/fulfilled') {
            dispatch(getAllSubscriptions())
            handleVisible()
            notification.success({
              message: ' Subscription created successfully',
            })
          } else if (response.type === 'subscription/create/rejected') {
            handleVisible()
            notification.error({
              message:
                response?.payload?.message || 'Error creating subscription, please try again',
            })
          }
        })
        .catch((error) => {
          setConfirmLoading(false)
          notification.error({
            message: 'Error creating subscription, please try again later',
          })
        })
  }

  return (
    <>
      <Modal
        title={`${update ? 'Update' : 'Create'} Subscription`}
        visible={visibility}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => handleVisible(false)}
        okText={`${update ? 'Update' : 'Create'} Subscription`}
      >
        <Form
          name='subscription'
          layout='vertical'
          onFinish={handleFinish}
          requiredMark='optional'
          form={form}
          initialValues={singleData}
        >
          <Form.Item
            name='name'
            placeholder='Name'
            label='Subscription Name'
            rules={[
              {
                required: true,
                message: 'Subscription name is required',
              },
            ]}
          >
            <Input size='large' placeholder='Subscription name' />
          </Form.Item>
          <Form.Item
            name='amount'
            placeholder='Amount'
            label='Amount'
            rules={[
              {
                required: true,
                message: 'Amount  is required',
              },
              {
                pattern: '^[0-9]*$',
                message: 'Amount must be a number',
              },
            ]}
          >
            <Input size='large' placeholder='Amount' />
          </Form.Item>

          <Form.Item
            name='description'
            placeholder='Description'
            label='Description'
            rules={[
              {
                required: true,
                message: 'Description is required',
              },
            ]}
          >
            <Input size='large' placeholder='Description' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateSubscriptionModal
