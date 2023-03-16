import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/user/category/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/user/category/show/${data}`)
  return response.data
}

const createCategory = async (data) => {
  const response = await AuthAPI.post(`/admin/category/create`, data)
  return response.data
}

const editCategory = async (data) => {
  const response = await AuthAPI.post(`/admin/category/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/category/delete/${data}`)
  return response.data
}

export const CategoryService = {
  getAll,
  getOne,
  createCategory,
  editCategory,
  deleteOne,
}