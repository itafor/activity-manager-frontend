import { PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAppointment } from '../../redux/appointmentSlice'
import AppointmentTable from './BookingTable'

const Bookings = () => {
  const { appointment } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAppointment())
  }, [])

  return (
    <div>
      <PageHeader title='Bookings' />
      <AppointmentTable
        parent={'appointment'}
        data={appointment.data}
        loading={appointment.loading}
      />
    </div>
  )
}

export default Bookings
