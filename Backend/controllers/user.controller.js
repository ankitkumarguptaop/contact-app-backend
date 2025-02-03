const { userServices } = require("../services");

exports.listUser = async (req, res) => {
  try {
    const users = await userServices.listUser({
      query: req.query,
    });
    res.json(users);
  } catch (error) {
    console.log("Failed to list users", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userServices.getUser({ params: req.params });
    res.json(user);
  } catch (error) {
    console.log("Failed to get user", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await userServices.updateUser({
      body: req.body,
      params: req.params,
      thisUser: req.user,
    });
    res.json({
      message: "successfuly user updated ",
    });
  } catch (error) {
    console.log("Failed to update", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userServices.deleteUser({
      params: req.params,
      thisUser: req.user,
    });
    res.json({ message: "successfuly deleted user" });
  } catch (error) {
    console.log("Failed to delete user", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
