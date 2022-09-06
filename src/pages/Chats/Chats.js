import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatByUser } from '../../redux/chatSlice'

const Chats = () => {
  const dispatch = useDispatch()
  const { chat } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getChatByUser('1'))
  }, [])

  return <div>Chats</div>
}

export default Chats
