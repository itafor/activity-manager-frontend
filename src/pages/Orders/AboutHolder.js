import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const AboutHolder = ({ holder }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-10'>
        <RowDetails label='First Name' value={holder?.first_name || 'Null'} />
        <RowDetails label='Last Name' value={holder?.last_name || 'Null'} />
        <RowDetails label='Email' value={holder?.email || 'Null'} />
        <RowDetails label='Phone number' value={holder?.phone_number || 'Null'} />
        <RowDetails label='Policy holder type' value={holder?.policy_holder_type || 'Null'} />

        <RowDetails label='Date Created' value={moment(holder?.created_at).format('DD MMM YYYY')} />
      </div>
    </StyledContainer>
  )
}

export default AboutHolder

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
