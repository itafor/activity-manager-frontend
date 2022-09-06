import AuthAPI from "./authInstance";

const getProfile = async (data) => {
  const response = await AuthAPI.get(`/admin/profile`);
  return response.data;
};

const editProfile = async (data) => {
  const response = await AuthAPI.delete(`/admin/update-profile`);
  return response.data;
};

const editProfilePicture = async (data) => {
  const response = await AuthAPI.post("/admin/update-profile/picture");
  return response.data;
};

export const profileService = {
  getProfile,
  editProfile,
  editProfilePicture,
};
