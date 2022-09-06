import AuthAPI from "./authInstance";

const getAllSubscriptionPayment = async (data) => {
  const response = await AuthAPI.get("/admin/subscription/payment/history");
  return response.data;
};

const getOneSubscriptionPayment = async (data) => {
  const response = await AuthAPI.get(
    `/admin/subscription/payment/history/${data}`
  );
  return response.data;
};

const getAllAppointmentPayment = async (data) => {
  const response = await AuthAPI.get("/admin/appointment/payment/history");
  return response.data;
};

const getOneAppointmentPayment = async (data) => {
  const response = await AuthAPI.get(
    `/admin/appointment/payment/history/${data}`
  );
  return response.data;
};

export const paymentService = {
  getOneAppointmentPayment,
  getAllAppointmentPayment,
  getOneSubscriptionPayment,
  getAllSubscriptionPayment,
};
