import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/insurances')
  }, [])

  return <div onClick={() => navigate('/insurances')}>Dashboard</div>
}

export default Dashboard
