import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { createCategory, getAllCategories } from '../../redux/categorySlice'
import { notification } from 'antd'

const initialFormState = {
  name: '',
  description: '',
}

function CreateCategory() {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [cateoryFormData, setcateoryFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setcateoryFormData({
      ...cateoryFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setcateoryFormData({
      name: '',
      description: '',
    })
    setImage('')
  }

  const handleCreateCategory = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', cateoryFormData.name)
    formData.append('description', cateoryFormData.description)

    setConfirmLoading(true)
    dispatch(createCategory(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'category/create/fulfilled') {
          dispatch(getAllCategories())
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'Category created successfully',
          })
        } else if (response.type === 'category/create/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating category, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Create categery</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create categery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCategory}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter categery name'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default CreateCategory
