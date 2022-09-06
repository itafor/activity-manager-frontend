import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import PhysicianInfoDetails from './PhysicianInfoDetails'
import PhysicianReviewTable from './PhysicianReviewTable'
// import SelectedCourses from './SelectedCourses'
// import Posts from './Posts'
// import Orders from './Orders'
// import AboutUser from './AboutUser'
const { TabPane } = Tabs

const PhysicianInfoTab = (props) => {
  const { singleData } = useSelector((state) => state.physician)

  return (
    <div {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Physician Info' key='1'>
          <PhysicianInfoDetails singleData={singleData} />
        </TabPane>
        {/* <TabPane tab='Reviews' key='2'>
          <PhysicianReviewTable
            parent={'physician'}
            loading={false}
            data={singleData?.physician_reviews}
          />
        </TabPane> */}
      </Tabs>
    </div>
  )
}

export default PhysicianInfoTab
