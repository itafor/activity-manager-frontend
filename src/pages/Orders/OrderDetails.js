import { Avatar, Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'

import moment from 'moment'

import { NumericFormat } from 'react-number-format'
import { getOneOrder } from '../../redux/orderSlice'
import OrderInfoTabs from './OrderInfoTabs'

const OrderDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneOrder(id))
  }, [id])

  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card loading={loading} className='userInfo__card' title='Order Details'>
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
                  `${singleData?.track_no}` || ''
                } `}</Typography.Title>
              }
              description={
                <div className='metaDescription'>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Terms conditions accepted:</strong>{' '}
                    {singleData?.terms_conditions_accepted || '0'}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Insurance type:</strong> {singleData?.insurance_type || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Payment status:</strong> {singleData?.payment_status || 'N/A'}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Amount:</strong>
                    <NumericFormat
                      value={singleData?.amount}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'₦'}
                    />
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <Link to={`/user/details/${singleData?.user?.id}/${singleData?.user?.email}`}>
                      <strong style={{ cursor: 'none' }}>User:</strong>{' '}
                      {singleData?.user?.first_name || ''} {singleData?.user?.last_name || ''}
                    </Link>
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <Link
                      to={`/insurance/details/${singleData?.insurance?.id}/${singleData?.insurance?.slug}`}
                    >
                      <strong style={{ cursor: 'none' }}>Insurance:</strong>{' '}
                      {singleData?.insurance?.name || ''}
                    </Link>
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Created At:</strong>{' '}
                    {moment(singleData.created_at).format('DD MMM YYYY') || ''}
                  </div>
                </div>
              }
            />
          </Card>

          <OrderInfoTabs
            vehicle={singleData?.about_vehicle}
            holder={singleData?.about_holder}
            holderCompleteDetail={singleData?.policy_holder_complete_detail}
            payment={singleData?.payment}
          />
        </div>
      </div>
    </StyledContainer>
  )
}

export default OrderDetails

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
