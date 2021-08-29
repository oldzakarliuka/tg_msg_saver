const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  is_bot: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  msgs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Msg",
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
