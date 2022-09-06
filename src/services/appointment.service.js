import AuthAPI from "./authInstance";

const getAll = async (data) => {
  const response = await AuthAPI.get("/admin/appointment/list");
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/appointment/show/${data}`);
  return response.data;
};

export const appointmentService = {
  getAll,
  getOne,
};
