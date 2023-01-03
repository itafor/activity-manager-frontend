import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import OrderTable from '../Orders/OrderTable'
import GroupTable from '../Groups/GroupTable'

const { TabPane } = Tabs

const CustomerTabs = ({ orders, props, groups }) => {
  const { singleData, loading } = useSelector((state) => state.customers)
  useEffect(() => {
    console.log('orders', orders)
  }, [])

  return (
    <StyledDiv {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Orders' key='1'>
          {/* <EditProfile singleData={singleData} /> */}
          <OrderTable data={orders ? orders : []} loading={false} />
        </TabPane>
        <TabPane tab='Custmer Groups' key='2'>
          <GroupTable data={groups} loading={loading} />
        </TabPane>
      </Tabs>
    </StyledDiv>
  )
}

export default CustomerTabs

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`
