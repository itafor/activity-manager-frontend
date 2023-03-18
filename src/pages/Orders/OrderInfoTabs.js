import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import AboutVehicle from './AboutVehicle'
import AboutHolder from './AboutHolder'
import PolicyHolderCompleteDetail from './PolicyHolderCompleteDetail'
import OrderPayment from './OrderPayment'

const { TabPane } = Tabs

const OrderInfoTabs = ({ vehicle, holder, holderCompleteDetail, payment }) => {
  //   const { singleData } = useSelector((state) => state.clients)

  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='About Vehicle' key='1'>
          <AboutVehicle vehicle={vehicle} />
        </TabPane>
        <TabPane tab='About Holder' key='2'>
          <AboutHolder holder={holder} />
        </TabPane>

        <TabPane tab='Policy Holder Complete Detail' key='3'>
          <PolicyHolderCompleteDetail holderCompleteDetail={holderCompleteDetail} />
        </TabPane>
        <TabPane tab='Payment' key='4'>
          <OrderPayment payment={payment} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default OrderInfoTabs
