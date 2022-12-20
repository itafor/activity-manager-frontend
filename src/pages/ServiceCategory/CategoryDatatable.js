import React, { useEffect } from 'react'

import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact'

const CategoryDatatable = ({ categories, setSingleData }) => {
  function testClickEvent(param) {
    alert(param)
  }

  useEffect(() => {
    console.log('data', categories)
  }, [])

  const listCategories =
    categories &&
    categories.map((category, key) => {
      return {
        name: category.name,
        description: category.description,
        image: category.image,
        clickEvent: () => setSingleData(category),
      }
    })
  const data = () => {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Description',
          field: 'description',
          width: 270,
        },
        {
          label: 'Image',
          field: 'image',
          width: 200,
        },
        {
          label: 'Action',
          field: 'action',
          width: 200,
        },
      ],
      rows: listCategories && listCategories,
    }
  }
  return (
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
            striped
            bordered
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data()}
            materialSearch={true}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  )
}

export default CategoryDatatable
