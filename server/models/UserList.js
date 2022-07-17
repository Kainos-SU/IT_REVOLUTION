const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userListSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: Boolean,
  //   required: true,
  // },
  // s: {
  //   type: Boolean,
  //   required: true,
  // },
  // category: {
  //   type: Number,
  //   required: true,
  // },
  // user: {
  //   ref: "users",
  //   type: Schema.Types.ObjectId,
  // },
});

module.exports = mongoose.model("UserList", userListSchema);
