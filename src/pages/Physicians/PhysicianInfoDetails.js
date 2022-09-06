import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const PhysicianInfoDetails = ({ singleData }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-4'>
        <RowDetails label='Profession' value={singleData?.profession || 'Null'} />
        <RowDetails label='Specialization' value={singleData?.specialization || 'Null'} />
        <RowDetails
          label='Experience'
          value={singleData?.years_of_experience + ' Years' || 'Null'}
        />
        <RowDetails label='Address' value={singleData?.address || 'Null'} />
        <RowDetails
          label='Date of Birth'
          value={
            singleData?.date_of_birth
              ? moment(singleData?.date_of_birth).format('DD MMM YYYY')
              : 'Null'
          }
        />
        <RowDetails
          label='Subscription Plan'
          value={singleData?.subscription_plan?.name || 'Null'}
        />
        <RowDetails label='Subscription Status' value={singleData?.subscription_status || 'Null'} />
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
        <RowDetails label='Reviews' value={singleData?.reviews || 'Null'} />
        <RowDetails label='Rating' value={singleData?.star_ratings || 'Null'} />

        <RowDetails
          label='Date Created'
          value={moment(singleData?.created_at).format('DD MMM YYYY')}
        />
      </div>
    </StyledContainer>
  )
}

export default PhysicianInfoDetails

const StyledContainer = styled.div`
  height: fill;
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
