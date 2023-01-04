import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import ProductTabs from './ProductTabs'
import { Button } from 'antd'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
// import CountdownTimer from './CountdownTimer'
// import GroupTab from './GroupTab'
import { BsArrowLeft } from 'react-icons/bs'
import { getOneOrder } from '../../redux/orderSlice'
import OrderTabs from './OrderTabs'

export default function OrderDetail() {
  const { singleData } = useSelector((state) => state.orders)
  const { id, refkey } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //   const relatedproducts = singleData?.related_products?.map((prod, key) => {
  //     return prod?.product
  //   })

  useEffect(() => {
    dispatch(getOneOrder(id))
    console.log('singleData order', singleData)
  }, [id])

  return (
    <div>
      <Card>
        <div className={` flex, justify-end`} onClick={() => navigate(-1)}>
          <div to='#' className='userInfo__back  float-end'>
            <Button
              icon={<BsArrowLeft />}
              type='link'
              className='hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300'
            >
              Back
            </Button>
          </div>
        </div>
        <Card.Header>
          <div className='pull-left'>Order Details</div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '65px' }}>Order type:</strong>{' '}
                      {singleData?.order_type}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '20px' }}>Total Amount:</strong> ₦
                      {Number(singleData?.total).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '25px' }}>payment_status:</strong>{' '}
                      {singleData?.payment_status}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Items count:</strong>{' '}
                      {singleData?.items?.length}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Created by:</strong>{' '}
                      <Link to={`/customer/details/${singleData?.user?.id}`}>
                        {singleData?.user?.first_name} {singleData?.user?.last_name}
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Created at:</strong>{' '}
                      {moment(singleData?.created_at).format('DD MMM YYYY HH:mm A')}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* <GroupTab members={singleData?.members} loading={false} /> */}
          <OrderTabs items={singleData?.items} order_type={singleData?.order_type} />
        </Card.Body>
      </Card>
    </div>
  )
}
