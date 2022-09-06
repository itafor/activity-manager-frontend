import { Avatar, Button, Card, notification, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// import ProfileTab from '../../components/Header/ProfileTab'
// import { getUser } from '../../store/userSlice'
// import classes from './UserInfo.module.css'
// import UserInfoTabs from './UserInfoTabs'
import { BsPhone, BsArrowLeft, BsMailbox, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
import { getOnePhysician, resetSelectedPhysician } from '../../redux/physicianSlice'
import PhysicianInfoTab from './PhysicianInfoTab'
// import PatientInfoTab from './PatientInfoTab';

const PatientInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.physician)

  useEffect(() => {
    dispatch(getOnePhysician(id))
  }, [id])

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
                <Avatar
                  size={100}
                  src={singleData?.profile_photo_url || 'https://joeschmoe.io/api/v1/random'}
                />
              }
              title={
                singleData === null ? (
                  <Typography.Title level={3}>Physician does not exist</Typography.Title>
                ) : (
                  <Typography.Title level={2} className='text-3xl m-0 w-full'>{`${
                    singleData?.first_name || ''
                  } ${singleData?.full_name || ''}`}</Typography.Title>
                )
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
                  <div className='metaDescription__description'>
                    <p>{singleData?.physician_profile}</p>
                  </div>
                </div>
              }
            />
          </Card>
          <PhysicianInfoTab className='infoTab' />
        </div>
      </div>
    </StyledContainer>
  )
}

export default PatientInfo

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
    &__description {
      /* display: none; */
      p {
        font-size: 0.75rem;
        margin-top: 0.2rem;
        max-width: 480px;
      }
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
