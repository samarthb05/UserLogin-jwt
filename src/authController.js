const userModel = require("./authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
require("dotenv").config();

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

//register
module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res
      .status(400)
      .json({ message: "Name,email and password are required!" });
  }
  const validate = schema.validate(password, { details: true });
  if (validate.length > 0) {
    return res.status(400).json({ message: validate });
  }

  try {
    const userexists = await userModel.findOne({ name });
    if (userexists) {
      return res
        .status(409)
        .json({ message: "User already exists ,please logged-in!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newuser = new userModel({ name, email, password: hashedPassword });
    const user = await newuser.save();
    const { password:_, ...userWithoutPassword } = user._doc;
    res.status(200).json({ message: "User added succesfully!", data: userWithoutPassword });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

//login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if ( !email ||!password  ) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }
  try {
    const loginuser = await userModel.findOne({ email });
    if (!loginuser) {
      return res.status(400).json({ message: "Invalid user!" });
    }
    const checkpassword = await bcrypt.compare(password, loginuser.password);
    if (!checkpassword) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const jwtToken = jwt.sign(
      { userId: loginuser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    const { password:_, ...userWithoutPassword } = loginuser._doc;
    return res.status(200).json({
      message: "User logged-in successfully!",
      data: userWithoutPassword,
      jwtToken,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

//getprofile - to check autht is working or not
module.exports.getUser = async (req, res) => {
  try {
    const getprofile = await userModel.findById(req.userId);
    if (!getprofile) {
      return res.status(404).json({ message: "profile not found!" });
    }
    const { password:_, ...userWithoutPassword } = getprofile._doc;
    return res
      .status(200)
      .json({ message: "Profile fetched successfully!", data: userWithoutPassword });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
