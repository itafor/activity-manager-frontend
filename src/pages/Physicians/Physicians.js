import { Button, PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPhysician, getTopPhysician } from '../../redux/physicianSlice'
import PhysiciansTable from './PhysiciansTable'

const Physicians = () => {
  const dispatch = useDispatch()
  const { physician } = useSelector((state) => state)
  const [dataType, setDataType] = useState('all_physicians')

  const handleChangeDataType = (dataType) => {
    setDataType(dataType)
  }

  useEffect(() => {
    dispatch(getAllPhysician())
    dispatch(getTopPhysician())
  }, [])

  return (
    <div>
      <PageHeader
        extra={[
          <Button
            onClick={() => handleChangeDataType('all_physicians')}
            key='all_physicians'
            type={dataType === 'all_physicians' && 'primary'}
          >
            All Physicians
          </Button>,
          <Button
            onClick={() => handleChangeDataType('top_physicians')}
            key='top_physicians'
            type={dataType === 'top_physicians' && 'primary'}
          >
            Top Physicians
          </Button>,
        ]}
        title='Physicians'
      />
      <PhysiciansTable
        data={dataType === 'top_physicians' ? physician?.topData : physician.data}
        loading={physician.loading}
      />
    </div>
  )
}

export default Physicians
