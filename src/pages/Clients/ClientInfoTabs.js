import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import ClientInfoDetails from './ClientInfoDetails'
import BookingTable from '../Bookings/BookingTable';
// import SelectedCourses from './SelectedCourses'
// import Posts from './Posts'
// import Orders from './Orders'
// import AboutUser from './AboutUser'


const { TabPane } = Tabs

const ClientInfoTab = (props) => {
  const { singleData } = useSelector((state) => state.patient)

  return (
    <div {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Patient Info' key='1'>
          <ClientInfoDetails singleData={singleData} />
        </TabPane>
        <TabPane tab='Appointments' key='2'>
          <BookingTable
            parent={'patient'}
            loading={false}
            data={singleData?.patient_appointments}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ClientInfoTab
