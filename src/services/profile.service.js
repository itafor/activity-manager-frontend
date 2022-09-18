import AuthAPI from './authInstance'

const getProfile = async (data) => {
  const response = await AuthAPI.get(`/admin/profile`)
  return response.data
}

const editProfile = async (data) => {
  const response = await AuthAPI.post(`/admin/update-profile`, data)
  return response.data
}

const editProfilePicture = async (data) => {
  const response = await AuthAPI.post('/admin/update-profile/picture', data)
  return response.data
}

export const profileService = {
  getProfile,
  editProfile,
  editProfilePicture,
}
