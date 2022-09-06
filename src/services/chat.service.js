import AuthAPI from "./authInstance";

const sendMessage = async (data) => {
  const response = await AuthAPI.post("/chat/send-message");
  return response.data;
};

const getChatByUser = async (data) => {
  const response = await AuthAPI.get(
    `/chat/between-two-users/messages/${data}`
  );
  return response.data;
};

const getOneChat = async (data) => {
  const response = await AuthAPI.get(`/chat/message/${data}`);
  return response;
};

const deleteChat = async (data) => {
  const response = await AuthAPI.delete(`/chat/delete-message/${data}`);
  return response;
};

export const chatService = {
  sendMessage,
  getChatByUser,
  getOneChat,
  deleteChat,
};
