import React, { useEffect, useRef } from 'react'

import { Avatar, Button, Card, notification, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope, BsLadder } from 'react-icons/bs'
import styled from 'styled-components'
import { getAllCustomers, getOneCustomer } from '../../redux/customerSlice'
import CustomerTabs from './CustomerTabs'
import AddIndividualActivity from './AddIndividualActivity'

function CustomerDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singleData, loading } = useSelector((state) => state.customers)
  const { id } = useParams()
  useEffect(() => {
    dispatch(getOneCustomer(id))
    console.log('single users', singleData)
  }, [id])

  const userActivities = singleData?.activities?.map((activity, key) => {
    return activity?.pivot
  })
  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card loading={loading} className='userInfo__card'>
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
              avatar={
                <div className='avatar_overlay'>
                  <Avatar
                    size={100}
                    src={singleData?.profile_photo_url || 'https://joeschmoe.io/api/v1/random'}
                  />
                </div>
              }
              title={
                <Typography.Title level={2} className='text-3xl m-0 w-full'>
                  {`${singleData?.full_name} `}
                </Typography.Title>
              }
              description={
                <div className='metaDescription'>
                  {singleData?.phone_number && (
                    <div className='flex align-middle items-center gap-3 flex-wrap'>
                      <a className='text-sm' href={`tel:${singleData?.phone_number}`}>
                        <BsPhone size={15} /> {singleData?.phone_number || 'no phone'}
                      </a>
                    </div>
                  )}
                  <div className='flex align-middle items-center gap-3 flex-wrap '>
                    <a href={`mailto:${singleData?.email}`} className='text-sm'>
                      <BsEnvelope size={15} /> {singleData?.email || ''}
                    </a>
                  </div>
                </div>
              }
            />
            <div className='float-end'>
              <Button
                style={{ marginRight: '5px' }}
                title={`Add activity for ${singleData?.full_name}`}
              >
                <AddIndividualActivity user_name={singleData?.full_name} user={singleData} />
              </Button>
            </div>
          </Card>
          <CustomerTabs
            activities={userActivities ? userActivities : []}
            user_name={singleData?.full_name}
            user={singleData}
          />
        </div>
      </div>
    </StyledContainer>
  )
}
export default CustomerDetail

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

  .avatar_overlay {
    position: relative;

    input[type='file'] {
      display: none;
    }

    &:hover::after {
      transition: all 0.5s;
      opacity: 0.6;
    }

    &:hover::before {
      transition: all 0.2s;
      opacity: 1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: black;
      border-radius: 100%;
      opacity: 0;
      cursor: pointer;
    }

    &::before {
      content: 'Edit';
      z-index: 2;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 10%);
      border: 1px solid white;
      padding: 0.05rem 1rem;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      opacity: 0;
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
`
