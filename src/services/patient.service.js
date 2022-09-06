import AuthAPI from "./authInstance";

const getAll = async (data) => {
  const response = await AuthAPI.get("/admin/patient/list");
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/patient/show/${data}`);
  return response.data;
};

export const patientService = {
  getAll,
  getOne,
};
