import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import ServiceProviderInfoDetails from './ServiceProviderInfoDetails'
import ServiceTable from './ServiceTable'
import ReviewsTable from './ReviewsTable'

const { TabPane } = Tabs

const ServiceProviderInfoTab = (props) => {
  const { singleData } = useSelector((state) => state.serviceProviders)

  return (
    <div {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Patient Info' key='1'>
          <ServiceProviderInfoDetails singleData={singleData} />
        </TabPane>
        <TabPane tab='Services' key='2'>
          <ServiceTable parent={'client'} loading={false} data={singleData?.services} />
        </TabPane>
        <TabPane tab='Reviews' key='3'>
          <ReviewsTable parent={'client'} loading={false} data={singleData?.client_orders} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ServiceProviderInfoTab
