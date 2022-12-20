import { Form, Modal, Input, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createServiceCategory,
  editServiceCategory,
  getAllServiceCategory,
} from '../../redux/serviceCategorySlice'

const CreateCategoryModal = ({ visibility, handleVisible, update, singleData }) => {
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
    setConfirmLoading(true)

    if (update)
      dispatch(editServiceCategory({ ...values, category_id: singleData?.id }))
        .then((response) => {
          setConfirmLoading(false)
          if (response.type === 'serviceCategory/edit/fulfilled') {
            dispatch(getAllServiceCategory())
            handleVisible()
            notification.success({
              message: 'Service category updated successfully',
            })
          } else if (response.type === 'serviceCategory/edit/rejected') {
            handleVisible()
            notification.error({
              message:
                response?.payload?.message || 'Error updating service category, please try again',
            })
          }
        })
        .catch((error) => {
          setConfirmLoading(false)
          notification.error({
            message: 'Error updating service category, please try again later',
          })
        })
    else
      dispatch(createServiceCategory(values))
        .then((response) => {
          setConfirmLoading(false)
          if (response.type === 'serviceCategory/create/fulfilled') {
            dispatch(getAllServiceCategory())
            handleVisible()
            notification.success({
              message: ' Service category created successfully',
            })
          } else if (response.type === 'serviceCategory/create/rejected') {
            handleVisible()
            notification.error({
              message:
                response?.payload?.message || 'Error creating service category, please try again',
            })
          }
        })
        .catch((error) => {
          setConfirmLoading(false)
          notification.error({
            message: 'Error creating service category, please try again later',
          })
        })
  }

  return (
    <>
      <Modal
        title={`${update ? 'Update' : 'Create'} Service category`}
        visible={visibility}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => handleVisible(false)}
        okText={`${update ? 'Update' : 'Create'} Service category`}
      >
        <Form
          name='Service category'
          layout='vertical'
          onFinish={handleFinish}
          requiredMark='optional'
          form={form}
          initialValues={singleData}
        >
          <Form.Item
            name='name'
            placeholder='Name'
            label='Service Category Name'
            rules={[
              {
                required: true,
                message: 'Service category name is required',
              },
            ]}
          >
            <Input size='large' placeholder='Service category name' />
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

export default CreateCategoryModal
