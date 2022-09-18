import React, { useEffect, useState } from 'react'
import ServiceCategoryTable from './ServiceCategoryTable'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteServiceCategory, getAllServiceCategory } from '../../redux/serviceCategorySlice';
import CreateServiceCategoryModal from './CreateServiceCategoryModal';

const ServiceCategory = () => {
    const { serviceCategory } = useSelector((state) => state)
    const dispatch = useDispatch()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [modalKey, setModalKey] = useState(1)
  const [editData, setEditData] = useState({})
  const [confirmLoading, setConfirmLoading] = useState(false)


  const setSingleData = (data) => {
    setEditData(data)
    setUpdate(true)
  }

  const handleDelete =  ({id}) =>{
    dispatch(deleteServiceCategory(id))
        .then((response) => {
          setConfirmLoading(false)
          if (response.type === 'serviceCategory/delete/fulfilled') {
            dispatch(getAllServiceCategory())
            notification.success({
              message: ' Service category deleted successfully',
            })
          } else if (response.type === 'serviceCategory/delete/rejected') {
            notification.error({
              message:
                response?.payload?.message || 'Error deleting service category, please try again',
            })
          }
        })
        .catch((error) => {
          setConfirmLoading(false)
          notification.error({
            message: 'Error deleting service category, please try again later',
          })
        })

  }

  useEffect(() => {
    setModalKey(modalKey + 1)
    if (showCreateModal === false) {
      setEditData({})
      setUpdate(false)
    }
  }, [showCreateModal])

    useEffect(() => {
      dispatch(getAllServiceCategory())
    }, [])

  return (
    <div>
      <PageHeader
      extra={[
        <Button onClick={() => setShowCreateModal(true)} key='top_physicians'>
          Create Category
        </Button>,
      ]}
      title='Service Categories' />
      <ServiceCategoryTable
        parent={'service-category'}
        data={serviceCategory?.data}
        loading={serviceCategory?.loading}
        setSingleData={setSingleData}
        handleVisible={setShowCreateModal}
        handleDelete={handleDelete}
        deleteLoading={confirmLoading}
      />
      <CreateServiceCategoryModal
       key={modalKey}
       visibility={showCreateModal}
       handleVisible={setShowCreateModal}
       update={update}
       singleData={editData}
      />
    </div>
  )
}

export default ServiceCategory





