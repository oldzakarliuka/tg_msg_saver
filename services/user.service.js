const User = require("../models/user");

const saveOrUpdate = async (user) => {
  if (!user) {
    return;
  }
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  return await User.findOneAndUpdate({ user_id: user.id }, user, options);
};

const updateRelationship = async ({ user_id, msg_id }) => {
  return await User.updateMany({ _id: user_id }, { $push: { msgs: msg_id } });
};
module.exports = {
  saveOrUpdate,
  updateRelationship,
};
