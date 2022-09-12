import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const ClientInfoDetails = ({ singleData }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-4'>
        <RowDetails label='Address' value={singleData?.retained_eduf_balance || 'Null'} />
        <RowDetails label='Date of Birth' value={singleData?.date_of_birth || 'Null'} />
        <RowDetails label='Subscription Status' value={singleData?.country || 'Null'} />
        <RowDetails
          label='Subscription Start Date'
          value={
            singleData?.subscription_start_date
              ? moment(singleData?.subscription_start_date).format('DD MMM YYYY')
              : 'Null'
          }
        />
        <RowDetails
          label='Subscription End Date'
          value={
            singleData?.subscription_end_date
              ? moment(singleData?.subscription_end_date).format('DD MMM YYYY')
              : 'Null'
          }
        />
        <RowDetails
          label='Email Verified'
          value={
            singleData?.email_verified_at
              ? moment(singleData?.email_verified_at).format('DD MMM YYYY')
              : 'Null'
          }
        />
        <RowDetails
          label='Phone Verified'
          value={
            singleData?.phone_number_verified_at
              ? moment(singleData?.phone_number_verified_at).format('DD MMM YYYY')
              : 'Null'
          }
        />
        <RowDetails
          label='Date Created'
          value={moment(singleData?.created_at).format('DD MMM YYYY')}
        />
      </div>
    </StyledContainer>
  )
}

export default ClientInfoDetails

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
