import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const AboutVehicle = ({ vehicle }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-10'>
        <RowDetails label='Class' value={vehicle?.vehicle_class || 'Null'} />
        <RowDetails
          label='Registration number'
          value={vehicle?.vehicle_registration_number || 'Null'}
        />
        <RowDetails label='Manufacturer' value={vehicle?.vehicle_manufacturer || 'Null'} />
        <RowDetails label='Vehicle model' value={vehicle?.vehicle_model || 'Null'} />
        <RowDetails label='Engine number' value={vehicle?.engine_number || 'Null'} />
        <RowDetails label='Chasis number' value={vehicle?.chasis_number || 'Null'} />
        <RowDetails label='vehicle colour' value={vehicle?.vehicle_colour || 'Null'} />

        <RowDetails
          label='Date Created'
          value={moment(vehicle?.created_at).format('DD MMM YYYY')}
        />
      </div>
    </StyledContainer>
  )
}

export default AboutVehicle

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
