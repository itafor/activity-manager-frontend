import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get('/admin/subscription/list')
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/subscription/show/${data}`)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/subscription/delete/${data}`)
  return response.data
}

const create = async (data) => {
  const response = await AuthAPI.post('/admin/subscription/create', data)
  return response.data
}

const edit = async (data) => {
  const response = await AuthAPI.post(`/admin/subscription/update`, data)
  return response.data
}

export const subscriptionService = {
  getAll,
  getOne,
  deleteOne,
  create,
  edit,
}
