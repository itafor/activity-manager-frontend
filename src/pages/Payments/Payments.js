/* eslint-disable react-hooks/exhaustive-deps */
import { PageHeader } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getAllAppointmentPayment, getAllSubscriptionPayment } from '../../redux/paymentSlice'
import AppointmentPaymentTable from './AppointmentPayment'
import SubscriptionPaymentTable from './SubscriptionPaymentTable'

const Payments = () => {
  const SELECTED_PAGES = {
    appointment: 'appointment',
    subscription: 'subscription',
  }
  const location = useLocation()
  const dispatch = useDispatch()
  const { payment } = useSelector((state) => state)

  const [selectedPage, setSelectedPage] = useState('')

  useLayoutEffect(() => {
    if (location.pathname.includes(SELECTED_PAGES.appointment)) {
      setSelectedPage('appointment')
    } else setSelectedPage(SELECTED_PAGES.subscription)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname.includes(SELECTED_PAGES.appointment)) {
      dispatch(getAllAppointmentPayment())
    }
    if (location.pathname.includes(SELECTED_PAGES.subscription)) {
      dispatch(getAllSubscriptionPayment())
    }
  }, [location.pathname])

  return (
    <div>
      <PageHeader title={`Payments / ${selectedPage}`} />
      {selectedPage === SELECTED_PAGES.appointment && (
        <AppointmentPaymentTable
          parent={selectedPage}
          data={payment?.appointmentData}
          loading={payment?.appointmentLoading}
        />
      )}
      {selectedPage === SELECTED_PAGES.subscription && (
        <SubscriptionPaymentTable
          parent={selectedPage}
          data={payment?.subscriptionData}
          loading={payment?.subscriptionLoading}
        />
      )}
    </div>
  )
}

export default Payments
