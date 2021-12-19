const { TGBOT_HOST, BOT_TOKEN } = require("../env");
const axios = require("axios");

const axiosInstance = (baseURL) => {
  const options = {};
  options.baseURL = baseURL;
  const instance = axios.create(options);

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
  return instance;
};

const http = axiosInstance(`${TGBOT_HOST}bot${BOT_TOKEN}/`);

module.exports.send2tg = async function (chat_id, text) {
  return await http.post(`sendmessage`, { chat_id, text });
};
