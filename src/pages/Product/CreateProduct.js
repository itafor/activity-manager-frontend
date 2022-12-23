import React, { useState, useEffect } from 'react'
import { PageHeader } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, getAllProducts } from '../../redux/productSlice'
import Messages from '../../ToastMessages/Messages'

const initialFormState = {
  name: '',
  category_id: '',
  quantity_instock: '',
  individual_price: '',
  group_price: '',
  featured_image: '',
  description: '',
  product_size: '',
}

function CreateProduct() {
  const [image, setImage] = useState('')
  const [productFormData, setProductFormData] = useState(initialFormState)
  const { serviceCategory } = useSelector((state) => state)
  const { products } = useSelector((state) => state)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(serviceCategory?.data)
  const [relatedProducts, setSelatedProducts] = useState(products?.data)
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState([{ related_product_id: '' }])

  useEffect(() => {
    dispatch(getAllProducts())
    console.log('getAllProducts', relatedProducts)
  }, [])

  const onChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setProductFormData({
      ...productFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setProductFormData({
      name: '',
      category_id: '',
      quantity_instock: '',
      individual_price: '',
      group_price: '',
      featured_image: '',
      description: '',
      product_size: '',
    })
    setImage('')
  }

  const handleCreateProduct = (e) => {
    e.preventDefault()
    console.log('related prod formValues', formValues)
    // return
    var formData = new FormData()
    formData.append('name', productFormData.name)
    formData.append('image', image)
    formData.append('category_id', productFormData.category_id)
    formData.append('individual_price', productFormData.individual_price)
    formData.append('group_price', productFormData.group_price)
    formData.append('product_size', productFormData.product_size)
    formData.append('description', productFormData.description)
    formData.append('quantity_instock', productFormData.quantity_instock)
    formData.append('related_productIds[]', 9)
    // formData.append('related_productIds', formValues)
    //create another endpoint for related products
    var data = JSON.stringify({
      name: 'product test',
      image: '',
      category_id: '2',
      individual_price: '3390',
      group_price: '44',
      product_size: '3kg',
      description: 'product 1',
      quantity_instock: '2',
      related_productIds: ['10', '9'],
    })

    setConfirmLoading(true)
    dispatch(createProduct(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'product/create/fulfilled') {
          dispatch(getAllProducts())
          console.log('new product', response)
          clearFormData()
          Messages.successMessage('Product created successfully', 'top-right')
          navigate(`/product/details/${response?.payload?.id}/${response?.payload?.sku}`)
        } else if (response.type === 'product/create/rejected') {
          console.log('error notificatom', 'Error creating product, please try again')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating product, please try again')
      })
  }
  const category_list =
    categories &&
    categories.map((category, key) => {
      return (
        <option value={category.id} key={key}>
          {category.name}
        </option>
      )
    })

  const related_products_list =
    relatedProducts &&
    relatedProducts.map((product, key) => {
      return (
        <option value={product.id} key={key}>
          {product.name}
        </option>
      )
    })

  let handleChange = (i, e) => {
    let newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
    console.log('multi related products values', newFormValues)
  }

  let addFormFields = () => {
    setFormValues([...formValues, { related_product_id: '' }])
    console.log('multi related products', formValues)
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues]
    newFormValues.splice(i, 1)
    setFormValues(newFormValues)
    console.log('remove multi related products', formValues)
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='products' variant='light'>
            <Link to='/products'>Back to list </Link>
          </Button>,
        ]}
        title='Create Product'
      />

      <Card>
        <Card.Header>Craete Product</Card.Header>
        <Card.Body>
          <Form onSubmit={handleCreateProduct}>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Name{productFormData.name}</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Product name'
                    onChange={(evt) => handleInputChange(evt)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Category {productFormData.category_id}</Form.Label>
                  <Form.Select
                    name='category_id'
                    onChange={(evt) => handleInputChange(evt)}
                    aria-label='Default select example'
                  >
                    <option>select category</option>
                    {category_list}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Individual price{productFormData.individual_price}</Form.Label>
                  <Form.Control
                    type='number'
                    name='individual_price'
                    onChange={(evt) => handleInputChange(evt)}
                    placeholder='individual price'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Group price{productFormData.group_price}</Form.Label>
                  <Form.Control
                    type='number'
                    name='group_price'
                    onChange={(evt) => handleInputChange(evt)}
                    placeholder='Group price'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Quantity in-stock{productFormData.quantity_instock} </Form.Label>
                  <Form.Control
                    type='text'
                    name='quantity_instock'
                    placeholder='Quantity in-stock'
                    onChange={(evt) => handleInputChange(evt)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Product Size {productFormData.product_size}</Form.Label>
                  <Form.Control
                    type='text'
                    name='product_size'
                    placeholder='Product Size'
                    onChange={(evt) => handleInputChange(evt)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='file'
                    onChange={(evnt) => onChangeImage(evnt)}
                    placeholder='Password'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Description {productFormData.description}</Form.Label>
                  <Form.Control
                    as='textarea'
                    placeholder='Leave a comment here'
                    style={{ height: '100px' }}
                    name='description'
                    onChange={(evt) => handleInputChange(evt)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <h3>Add related product</h3>
              <Col>
                {formValues.map((element, index) => (
                  <div className='form-inline' key={index}>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <Form.Label>Related product {index + 1}</Form.Label>

                      <Form.Select
                        name='related_product_id'
                        value={element.related_product_id || ''}
                        onChange={(e) => handleChange(index, e)}
                        aria-label='Default select example'
                      >
                        <option>Select product</option>
                        {related_products_list}
                      </Form.Select>
                    </Form.Group>

                    {index ? (
                      <button
                        type='button'
                        className='button remove'
                        onClick={() => removeFormFields(index)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ))}
                <div className='button-section'>
                  <button className='button add' type='button' onClick={() => addFormFields()}>
                    Add
                  </button>
                </div>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Card.Body>
        <ToastContainer />
      </Card>
    </div>
  )
}
export default CreateProduct
