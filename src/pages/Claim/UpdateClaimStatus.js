import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { useEffect } from 'react'
import { getAllClaims, getOneClaim, updateClaimStatus } from '../../redux/claimSlice'
import { notification } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'

const initialFormState = {
  status: '',
  claim_id: '',
}

function UpdateClaimStatus({ claim }) {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [claimFormData, setclaimFormData] = useState(initialFormState)
  const { id } = useParams()
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
    setclaimFormData({
      ...claimFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    setclaimFormData({
      status: claim.status,
      claim_id: claim.id,
    })
    console.log('claim', claim)
  }, [claim])

  const clearFormData = () => {
    setclaimFormData({
      status: '',
      claim_id: '',
    })
    setImage('')
  }

  const handleUpdateClaimStatus = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('status', claimFormData.status)
    formData.append('claim_id', claimFormData.claim_id)

    setConfirmLoading(true)
    dispatch(updateClaimStatus(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'claim/edit/fulfilled') {
          dispatch(getOneClaim(id))
          window.location.reload()
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'claim status updated successfully',
          })
        } else if (response.type === 'claim/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating claim, please try again')
      })
  }

  return (
    <>
      <Form onSubmit={handleUpdateClaimStatus}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Status</Form.Label>
          <Form.Select
            name='status'
            onChange={(evt) => handleInputChange(evt)}
            aria-label='Default select example'
            required
          >
            <option value=''>Select status</option>
            <option value='Paid'>Paid</option>
            <option value='Pending'>Pending</option>
            <option value='Declined'>Declined</option>
            <option value='Approved'>Approved</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Control
            type='hidden'
            name='claim_id'
            placeholder='claim_id'
            defaultValue={claimFormData.claim_id}
            onChange={(evt) => handleInputChange(evt)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}>
          {confirmLoading ? 'Please wait...' : 'Submit'}
        </Button>
      </Form>
    </>
  )
}

export default UpdateClaimStatus
