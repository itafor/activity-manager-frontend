import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { dashboardService } from '../../services/dashboardService'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/userSlice'
import { PageHeader } from 'antd'
import UserTable from '../Users/UserTable'
import styled from 'styled-components'

const Dashboard = () => {
  const { users } = useSelector((state) => state)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [dashboardStats, setdashboardStats] = useState()
  useEffect(() => {
    dispatch(getAllUsers())

    // navigate('/insurances')
    getStatistics()
  }, [])

  const getStatistics = () => {
    dashboardService
      .getDashboardStats()
      .then((res) => {
        setdashboardStats(res?.data)
        console.log('DB res', dashboardStats)
      })
      .catch((error) => {
        console.log('DB error', error)
      })
  }
  return (
    <div>
      <PageHeader extra={[]} title='Dashboard' />
      <StyledContainer>
        <CardGroup className='card-group'>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to='insurances'>
                  <Link to='/insurances'>Insurances</Link>
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.insurances_count}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to='/categories'>Categories</Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.category_count}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to='/companies'>Companies</Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.companies_count}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to='/orders'>Orders</Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.orders_count}</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup className='card-group'>
          <Card>
            <Card.Body>
              <Card.Title className='card-title'>
                <Link to='/payments'>Payments</Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.payments_count}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to='/users'>Users</Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.users_count}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to='/claims'>Claims</Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.claims_count}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to='/lessons'>Lessons</Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.lessons_count}</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </StyledContainer>
      <PageHeader extra={[]} title='Users' />
      <UserTable data={users.data} loading={users.loading} />
    </div>
  )
}

export default Dashboard
const StyledContainer = styled.div`
  .ant-card-meta {
    align-items: center !important;
  }
  .card-group {
    font-size: 14px;
    font-family: Arial;
  }
  .card-title {
    font-size: 14px;
    font-family: Arial;
  }
`
