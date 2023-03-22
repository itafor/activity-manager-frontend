import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/notification/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/notification/show/${data}`)
  return response.data
}

const createNotification = async (data) => {
  const response = await AuthAPI.post(`/admin/notification/send-email-notification`, data)
  return response.data
}

const editNotification = async (data) => {
  const response = await AuthAPI.post(`/admin/notification/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/notification/delete/${data}`)
  return response.data
}

export const notificationService = {
  getAll,
  getOne,
  createNotification,
  editNotification,
  deleteOne,
}
