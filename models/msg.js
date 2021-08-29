const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Msg", msgSchema);
