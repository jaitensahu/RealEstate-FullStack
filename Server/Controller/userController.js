const bcrypt = require("bcrypt");
const userModel = require("../Model/user");
const jwt = require("jsonwebtoken");
const { error } = require("console");

const registerUser = async (req, res) => {
  console.log(req.body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = await userModel.create({
      ...req.body,
      password: hash,
    });

    newUser.save();

    res.status(200).json({
      status: true,
      message: "User registration succesfull",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  // console.log("Login API called", req.body);
  try {
    const email = req.body.email;
    const user = await userModel.findOne({ email }).select("-_id");
    // Throw a error if user not found
    if (!user) {
      throw new Error("User Not Found");
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          email: user.email,
          name: user.firstName + " " + user.lastName,
        },
        process.env.SECRET_KEY
      );

      const { password, properties, __v, ...newuser } = user.toObject();
      // delete newuser.password;

      // console.log("User", newuser);
      res.status(200).cookie("token", token, { httpOnly: true }).json({
        success: true,
        message: "Login successfully",
        newuser,
      });
    } else {
      throw new Error("Wrong Password");
    }
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const getDataFromCookie = async (req, res) => {
  // console.log("getCookie called", req.cookies.token);
  try {
    if (!req.cookies.token) {
      throw error("not");
    }
    const email = decode(req.cookies.token);
    const user = await userModel
      .findOne({ email })
      .select(["-password", "-__v"]);

    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
    });
  }
};

const userUpdate = async (req, res) => {
  console.log("updating", req.cookies.token, req.body);
  try {
    const email = decode(req.cookies.token);
    const updatedUser = await userModel
      .findOneAndUpdate({ email }, { ...req.body })
      .select(["-password", "-__v", "-properties"]);
    console.log(updatedUser);
    res.status(200).json({
      success: true,
      message: "updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const userDelete = async (req, res) => {
  // console.log(req.headers.authorization.split(" ")[1]);
  try {
    const email = decode(req.headers.authorization.split(" ")[1]);
    await userModel.findOneAndDelete({ email });
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signOut = async (req, res) => {
  res.clearCookie("token", { httpOnly: true }).json({
    success: true,
    message: "user Logged Out Succefully",
  });
};

function decode(token) {
  const userData = jwt.decode(token);
  return userData.email;
}
const userApi = {
  registerUser,
  userLogin,
  userUpdate,
  userDelete,
  decode,
  getDataFromCookie,
  signOut,
};
module.exports = userApi;
