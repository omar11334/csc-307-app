import User from "../models/user.js";

export const findAllUsers = () => {
  return User.find();
};

export const findUserByName = (name) => {
  return User.find({ name: name });
};

export const findUserByJob = (job) => {
  return User.find({ job: job });
};

export const findUserByNameAndJob = (name, job) => {
  return User.find({ name: name, job: job });
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const addUser = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

export const deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
};
