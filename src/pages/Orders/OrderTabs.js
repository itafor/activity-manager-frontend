import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Items from './Items'

const { TabPane } = Tabs

const OrderTabs = ({ props, items, order_type }) => {
  const { singleData, loading } = useSelector((state) => state.orders)
  useEffect(() => {
    console.log('orders', singleData)
  }, [])

  return (
    <StyledDiv {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Items' key='1'>
          <Items items={items ? items : []} loading={false} order_type={order_type} />
        </TabPane>
        <TabPane tab='Payment' key='2'>
          {/* <GroupTable data={groups} loading={loading} /> */}
        </TabPane>
        <TabPane tab='Shipment' key='3'>
          {/* <GroupTable data={groups} loading={loading} /> */}
        </TabPane>
        <TabPane tab='User' key='4'>
          {/* <GroupTable data={groups} loading={loading} /> */}
        </TabPane>
        <TabPane tab='Group' key='5'>
          {/* <GroupTable data={groups} loading={loading} /> */}
        </TabPane>
      </Tabs>
    </StyledDiv>
  )
}

export default OrderTabs

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`
