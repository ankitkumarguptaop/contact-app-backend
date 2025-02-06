const { userModel } = require("../models");
const jwt = require("jsonwebtoken");
const users = userModel.User;
const {
  ForBidden,
  NoContent,
  UnAuthorized,
  NotFound,
  BadRequest,
} = require("../libs/error");

exports.signUp = async (payload) => {
  const { body, file } = payload;

  const profilePicture = file ? file.path : null;
  const { first_name, last_name, password, email } = body;
  console.log(body);
  console.log(profilePicture);
  if (!first_name || !last_name || !password || !email) {
    throw (error = new BadRequest("data not given"));
  }
  const user = await users.findOne({ email });
  if (user) {
    throw new ForBidden("User already signup!");
  } else {
    const signedUser = new users({ ...body, picture: profilePicture });
    return await signedUser.save();
  }
};

function generateToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
}

exports.signIn = async (payload) => {
  const { body } = payload;
  const { email, password } = body;
  if (!email || !password) {
    const error = new BadRequest("data not given");
    throw error;
  }
  const user = await users.findOne({ email: email });

  if (!user) {
    throw new ForBidden("Need to register First!");
  }
  if (await user.matchPassword(password)) {
    return { token: generateToken(user._id), user: user };
  } else {
    throw new UnAuthorized("Unauthorised access!");
  }
};

exports.googleAuth = async (payload) => {
  const { body } = payload;
  const { email, first_name, picture } = body;
  if ((!email && !first_name, !picture)) {
    throw new UnAuthorized("Unauthorised access!");
  }
  const user = await users.findOne({ email: email });
  if (user) {
    return { token: generateToken(user._id), user: user };
  } else {
    const createUser = new users({ ...body });
    await createUser.save();
    return { token: generateToken(createUser._id), user: createUser };
  }
};
