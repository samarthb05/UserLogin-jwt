const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongooes.model("User", userSchema);
module.exports = userModel;
