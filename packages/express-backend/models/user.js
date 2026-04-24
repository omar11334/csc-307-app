import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  job: String,
});

const User = mongoose.model("users_list", userSchema);

export default User;
