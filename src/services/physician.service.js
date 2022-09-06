import AuthAPI from "./authInstance";

const getAll = async (data) => {
  const response = await AuthAPI.get("/admin/physician/list");
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/physician/show/${data}`);
  return response.data;
};

const getTop = async (data) => {
  const response = await AuthAPI.get(`/admin/physician/top-rated`);
  return response.data;
};

const searchNameProfession = async (data) => {
  const response = await AuthAPI.post(`/admin/patient/search`);
  return response.data;
};

export const physicianService = {
  getAll,
  getOne,
  getTop,
  searchNameProfession,
};
