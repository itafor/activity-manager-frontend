import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import UserActivitiesTable from './UserActivitiesTable'

const { TabPane } = Tabs

const CustomerTabs = ({ activities, props, user_name, user }) => {
  const { singleData, loading } = useSelector((state) => state.customers)
  useEffect(() => {
    console.log('activities', activities)
  }, [])

  return (
    <StyledDiv {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Activities' key='1'>
          {/* <EditProfile singleData={singleData} /> */}
          <UserActivitiesTable
            data={activities ? activities : []}
            loading={false}
            user_name={user_name}
            user={user}
          />
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
