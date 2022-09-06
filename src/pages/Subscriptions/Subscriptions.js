import { Button, PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSubscriptions } from '../../redux/subscriptionSlice'
import CreateSubscriptionModal from './CreateSubscriptionModal'
import SubscriptionsTable from './SubscriptionsTable'

const Subscriptions = () => {
  const dispatch = useDispatch()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { data, loading } = useSelector((state) => state.subscription)
  const [update, setUpdate] = useState(false)
  const [modalKey, setModalKey] = useState(1)
  const [editData, setEditData] = useState({})

  const setSingleData = (data) => {
    setEditData(data)
    setUpdate(true)
  }

  useEffect(() => {
    dispatch(getAllSubscriptions())
  }, [])

  useEffect(() => {
    setModalKey(modalKey + 1)
    if (showCreateModal === false) {
      setEditData({})
      setUpdate(false)
    }
  }, [showCreateModal])

  return (
    <div>
      <PageHeader
        extra={[
          <Button onClick={() => setShowCreateModal(true)} key='top_physicians'>
            Create Subscription
          </Button>,
        ]}
        title='Subscriptions'
      />
      <SubscriptionsTable
        handleVisible={setShowCreateModal}
        setSingleData={setSingleData}
        data={data}
        loading={loading}
      />
      <CreateSubscriptionModal
        key={modalKey}
        visibility={showCreateModal}
        handleVisible={setShowCreateModal}
        update={update}
        singleData={editData}
      />
    </div>
  )
}

export default Subscriptions
