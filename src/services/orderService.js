import AuthAPI from './authInstance'

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/order/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/order/show/${data}`)
  return response.data
}

export const OrderService = {
  getAll,
  getOne,
}
