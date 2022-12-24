import React, { useState, useEffect } from 'react'
import { PageHeader } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, createRelatedProduct, getAllProducts } from '../../redux/productSlice'
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
  const [relatedProductformValues, setRelatedProductFormValues] = useState([
    { related_product_id: '' },
  ])
  const [moreImageValues, setMoreImageValues] = useState([{ more_images: '' }])
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    dispatch(getAllProducts())
    console.log('moreImageValues', moreImageValues)
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
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)
    var formData = new FormData()
    formData.append('name', productFormData.name)
    formData.append('image', image)
    formData.append('category_id', productFormData.category_id)
    formData.append('individual_price', productFormData.individual_price)
    formData.append('group_price', productFormData.group_price)
    formData.append('product_size', productFormData.product_size)
    formData.append('description', productFormData.description)
    formData.append('quantity_instock', productFormData.quantity_instock)
    formData.append('more_product_images[]', image)
    // formData.append('more_product_images[]', moreImageValues[1]?.more_images)
    // formData.append('more_product_images[]', moreImageValues[2]?.more_images)
    // formData.append('more_product_images[]', moreImageValues[3]?.more_images)
    // formData.append('more_product_images[]', moreImageValues[4]?.more_images)

    setConfirmLoading(true)
    dispatch(createProduct(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'product/create/fulfilled') {
          var relatedProductdata = {
            product_id: response?.payload?.id,
            related_productIds: relatedProductformValues,
          }
          if (relatedProductdata?.related_productIds.length >= 1) {
            dispatch(createRelatedProduct(relatedProductdata))
          }
          dispatch(getAllProducts())
          console.log('new product', response)
          clearFormData()
          Messages.successMessage('Product created successfully', 'top-right')
          navigate(`/product/details/${response?.payload?.id}/${response?.payload?.sku}`)
        } else if (response.type === 'product/create/rejected') {
          console.log('error notificatom', 'Error creating product, please try again')
          Messages.errorMessage('Error creating product, please try again', 'top-right')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating product, please try again')
        Messages.errorMessage('Error creating product, please try again', 'top-right')
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
    if (!isNaN(e.target.value)) {
      let newrelatedProductformValues = [...relatedProductformValues]
      newrelatedProductformValues[i][e.target.name] = e.target.value
      setRelatedProductFormValues(newrelatedProductformValues)

      console.log('multi related products values', relatedProductformValues)
    } else {
      let newrelatedProductformValues = [...relatedProductformValues]
      newrelatedProductformValues[i][e.target.name] = ''
      setRelatedProductFormValues(newrelatedProductformValues)
    }
  }

  let addFormFields = () => {
    if (relatedProductformValues && relatedProductformValues.length == 5) {
      alert("You can't add more than 5 related products")
      return
    }
    setRelatedProductFormValues([...relatedProductformValues, { related_product_id: '' }])
    console.log('multi related products', relatedProductformValues)
  }

  let removeFormFields = (i) => {
    let newrelatedProductformValues = [...relatedProductformValues]
    newrelatedProductformValues.splice(i, 1)
    setRelatedProductFormValues(newrelatedProductformValues)
    console.log('remove multi related products', newrelatedProductformValues)
  }

  let handleMoreImageChange = (i, e) => {
    // if (isNaN(e.target.files[0])) {
    let newMoreImageValues = [...moreImageValues]
    newMoreImageValues[i][e.target.name] = e.target.files[0]
    setRelatedProductFormValues(newMoreImageValues)

    console.log('multi images values', moreImageValues)
    // } else {
    //   let newMoreImageValues = [...moreImageValues]
    //   newMoreImageValues[i][e.target.name] = ''
    //   setMoreImageValues(newMoreImageValues)
    // }
  }

  let addMoreImageFormFields = () => {
    if (moreImageValues && moreImageValues.length == 5) {
      alert("You can't add more than 5 additional product images")
      return
    }
    setMoreImageValues([...moreImageValues, { more_images: '' }])
    console.log('multi related products', moreImageValues)
  }

  let removeMoreImageFormFields = (i) => {
    let newMoreImageValues = [...moreImageValues]
    newMoreImageValues.splice(i, 1)
    setMoreImageValues(newMoreImageValues)
    console.log('remove multi related products', newMoreImageValues)
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
          <Form noValidate validated={validated} onSubmit={handleCreateProduct}>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Name{productFormData.name}</Form.Label>
                  <Form.Control
                    type='text'
                    required
                    name='name'
                    placeholder='Product name'
                    onChange={(evt) => handleInputChange(evt)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    The product name is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Category {productFormData.category_id}</Form.Label>
                  <Form.Select
                    name='category_id'
                    onChange={(evt) => handleInputChange(evt)}
                    aria-label='Default select example'
                    required
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
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The group price field is required.
                  </Form.Control.Feedback>
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
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The individual price field is required.
                  </Form.Control.Feedback>
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
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The quantity in-stock field is required.
                  </Form.Control.Feedback>
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
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The product Size field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Image: ('jpg,jpeg and png')</Form.Label>
                  <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} required />
                  <Form.Control.Feedback type='invalid'>
                    The Image field is required.
                  </Form.Control.Feedback>
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
              <Col>
                <h6>
                  <strong>Add related products (optional)</strong>
                </h6>

                {relatedProductformValues.map((element, index) => (
                  <div className='form-inline' key={index}>
                    <InputGroup key={index}>
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
                        <span
                          className='button remove'
                          onClick={() => removeFormFields(index)}
                          style={{ color: 'red', cursor: 'pointer' }}
                          title='Delete from list'
                        >
                          Remove
                        </span>
                      ) : null}
                    </InputGroup>
                  </div>
                ))}
                <div className='button-section'>
                  <button className='button add mb-3' type='button' onClick={() => addFormFields()}>
                    Add More
                  </button>
                </div>
              </Col>
              <Col>
                <h6>
                  <strong>Add More Images (optional)</strong>
                </h6>

                {moreImageValues.map((element, index) => (
                  <div className='form-inline' key={index}>
                    <InputGroup key={index}>
                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>image {index + 1}</Form.Label>

                        <Form.Control
                          type='file'
                          name='more_images'
                          // value={element.related_product_id || ''}
                          onChange={(e) => handleMoreImageChange(index, e)}
                        />
                      </Form.Group>

                      {index ? (
                        <span
                          className='button remove'
                          onClick={() => removeMoreImageFormFields(index)}
                          style={{ color: 'red', cursor: 'pointer' }}
                          title='Delete from list'
                        >
                          Remove
                        </span>
                      ) : null}
                    </InputGroup>
                  </div>
                ))}
                <div className='button-section'>
                  <button
                    className='button add mb-3'
                    type='button'
                    onClick={() => addMoreImageFormFields()}
                    disabled
                  >
                    Add More
                  </button>
                </div>
              </Col>
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
