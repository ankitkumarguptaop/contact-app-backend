const { User } = require("../models/user.model");
const { 
  ForBidden,
  NoContent,
  UnAuthorized,
  NotFound,
  BadRequest,
} = require("../libs/error");

exports.listUser = async (payload) => {
  const { query } = payload;
  const { limit = 10, page = 1 } = query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  console.log(offset);
  const users = await User.find().skip(offset).limit(limit);
  if (!users) {
    const error = new NoContent("Users are not there ");
    throw error;
  }
  return users;
};

exports.getUser = async (payload) => {
  const { id } = payload.params;
  let user = await User.findById(id);
  if (!user) {
    const error = new NoContent("Cannot GET user ");
    throw error;
  }
  return user;
};

exports.updateUser = async (payload) => {
  const { body, params } = payload;
  const { id } = params;
  await User.findOneAndUpdate({ _id: id }, body, {
    returnDocument: "after",
  });
};

exports.deleteUser = async (payload) => {
  const { id } = payload.params;
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    const error = new NoContent("user not found to delete ");
    throw error;
  }
};
