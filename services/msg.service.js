const Msg = require("../models/msg");

const save = async (payload) => {
  if (!payload) {
    return;
  }
  return await Msg.create(payload);
};

module.exports = {
  save,
};
