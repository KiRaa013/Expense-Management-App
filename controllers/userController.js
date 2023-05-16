const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      e,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      e,
    });
  }
};

module.exports = { loginController, registerController };
