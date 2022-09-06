import React from 'react'
import { Tabs } from 'antd'
// import AppointmentTable from '../Appointments/BookingTable'
import { useSelector } from 'react-redux'
import PatientInfoDetails from './PatientInfoDetails'
import styled from 'styled-components'
// import SelectedCourses from './SelectedCourses'
// import Posts from './Posts'
// import Orders from './Orders'
// import AboutUser from './AboutUser'
const { TabPane } = Tabs

const PatientInfoTab = (props) => {
  const { singleData } = useSelector((state) => state.patient)

  return (
    <div {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Patient Info' key='1'>
          <PatientInfoDetails singleData={singleData} />
        </TabPane>
        <TabPane tab='Appointments' key='2'>
          {/* <AppointmentTable
            parent={'patient'}
            loading={false}
            data={singleData?.patient_appointments}
          /> */}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PatientInfoTab
