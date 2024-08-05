const userModel = require("../models/user");

async function createUser(req, res, next) {
  try {
    console.log("1111111111111222222222222");
    const user = await userModel.createUser(req.body);
    const { password: _, ...userData } = user;
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
}

// Add more methods as per your requirements

module.exports = {
  createUser,
  // Other methods
};
