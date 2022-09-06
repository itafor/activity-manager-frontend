import { PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPatient } from '../../redux/patientSlice'
import PatientsTable from './PatientsTable'

const Patients = () => {
  const dispatch = useDispatch()
  const { patient } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getAllPatient())
  }, [])

  return (
    <div>
      <PageHeader title='Patients' />
      <PatientsTable data={patient.data} loading={patient.loading} />
    </div>
  )
}

export default Patients
