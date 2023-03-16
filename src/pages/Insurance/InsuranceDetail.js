import { Avatar, Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
// import ClientInfoTabs from './ClientInfoTabs'
import { getOneInsurance } from '../../redux/InsuranceSlice'
import moment from 'moment'

const InsuranceDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.insurances)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneInsurance(id))
    console.log('single ins', singleData)
  }, [id])

  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card loading={loading} className='userInfo__card' title='Insurance Details'>
            <div className={` flex, justify-end`} onClick={() => navigate(-1)}>
              <div to='#' className='userInfo__back'>
                <Button
                  icon={<BsArrowLeft />}
                  type='link'
                  className='hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300'
                >
                  Back
                </Button>
              </div>
            </div>
            <Meta
              title={
                <Typography.Title level={2} className='text-3xl m-0 w-full'>{`${
                  `${singleData?.name}` || ''
                } `}</Typography.Title>
              }
              description={
                <div className='metaDescription'>
                  {
                    <Avatar
                      size={100}
                      src={singleData?.banner || 'https://joeschmoe.io/api/v1/random'}
                    />
                  }
                  {singleData?.description && (
                    <div className='flex align-middle items-center gap-3 flex-wrap'>
                      <a className='text-sm' href={`tel:${singleData?.description}`}>
                        {singleData?.description || 'no phone'}
                      </a>
                    </div>
                  )}
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Price:</strong> {singleData?.price || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Is-discounted:</strong> {singleData?.is_discounted || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Discount:</strong> {singleData?.discount || 'N/A'}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Discounted Price:</strong> {singleData?.discounted_price || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Category:</strong> {singleData?.category?.name || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Company:</strong> {singleData?.company?.name || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Star Ratings:</strong> {singleData?.rating_count || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Ratings counts:</strong> {singleData?.ratings?.length || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Lessons:</strong> {singleData?.lessons?.length || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Created At:</strong>{' '}
                    {moment(singleData.created_at).format('DD MMM YYYY') || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Terms and Conditions:</strong> {singleData?.terms_condition || ''}
                  </div>
                </div>
              }
            />
          </Card>

          {/* <ClientInfoTabs className='infoTab' /> */}
        </div>
      </div>
    </StyledContainer>
  )
}

export default InsuranceDetail

const StyledContainer = styled.div`
  .ant-card-meta {
    align-items: center !important;
  }

  .metaDescription {
    a {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }

  .userInfo {
    &__back {
      display: flex;
      justify-content: flex-end;
      button {
        display: flex;
        gap: 0.2rem;
        align-items: center;
        transition: all 0.3s;
      }
      button :hover {
        gap: 0.5rem;
      }
    }
  }

  .infoTab {
    margin-top: 1rem;
    padding: 0 0.5rem;
  }
  .insuranceprice {
    margin-top: 5px;
  }
`
