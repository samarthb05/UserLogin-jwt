const userModel = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
  .is()
  .min(8)
  .is()
  .max(16)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .symbols(1)
  .has()
  .digits(1);

//regitser
module.exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }
  const validate = schema.validate(password, { details: true });
  if (validate.length > 0) {
    return res.status(400).json({ message: validate });
  }

  try {
    const userexists = await userModel.findOne({ username });
    if (userexists) {
      return res
        .status(405)
        .json({ message: "User already exists ,please Logged-in!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newuser = new userModel({ username, password: hashedPassword });
    const user = await newuser.save();
    res.status(200).json({ message: "User added succesfuuly!", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login
module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }
  try {
    const loginuser = await userModel.findOne({ username });
    if (!loginuser) {
      return res.status(400).json({ message: "Invalid username!" });
    }
    const checkpassword = await bcrypt.compare(password, loginuser.password);
    if (!checkpassword) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const jwtToken = jwt.sign(
      { userId: loginuser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "User Logged-in successfully!",
      data: loginuser,
      jwtToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//edit
module.exports.editUser = async (req, res) => {
  try {
    const validate = schema.validate(req.body.password, { details: true });
    if (validate.length > 0) {
      return res.status(400).json({ message: validate });
    }
    if (req.body.password) {
      const encryptedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = encryptedPassword;
    }
    const updateuser = await userModel.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    if (!updateuser) {
      return res.status(400).json({ message: "User not found!" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully!", data: updateuser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete
module.exports.deleteUser = async (req, res) => {
  try {
    const removeuser = await userModel.findByIdAndDelete(req.userId);
    if (!removeuser) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully!", data: removeuser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//getprofile
module.exports.getUser = async (req, res) => {
  try {
    const getprofile = await userModel.findById(req.userId);
    if (!getprofile) {
      return res.status(404).json({ message: "profile not found!" });
    }
    return res
      .status(200)
      .json({ message: "Profile fetched successfully!", data: getprofile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
