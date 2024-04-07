const createProdModel = require("../Model/createProduct");
const userApi = require("../Controller/userController");
console.log();
const userModel = require("../Model/user");

const addNewProperty = async (req, res) => {
  try {
    const newProperty = await createProdModel.create({ ...req.body });
    const email = userApi.decode(req);
    const user = await userModel.findOneAndUpdate(
      { email },
      {
        $push: { properties: newProperty._id },
      }
    );
    console.log(user);
    res.status(200).json({
      success: true,
      message: "new Property added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  console.log("add Property called");
};

//-------------------------- UPDATE API PENDING-------------
const updateProperty = (req, res) => {
  console.log("updateProperty called");
};
// ----------------------------------------------------------
const deleteProperty = async (req, res) => {
  try {
    const id = req.body.id;
    await createProdModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Property Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProperty = async (req, res) => {
  console.log(req); 
  try { 
    const allData = await createProdModel.find();
    res.status(200).json({
      success: true,
      message: "Data Is here",
      data: allData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPropertyOfUser = async (req, res) => {
  try {
    const email = userApi.decode(req);
    const user = await userModel
      .findOne({ email })
      .select("-password")
      .populate("properties");
    console.log(user);
    res.status(200).json({
      success: true,
      message: "got the data",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const searchProp = async (req, res) => {
  console.log("called", req.query);
  try {
    const searchData = (await createProdModel.find()).filter(
      (ele) =>
        ele.title.toLowerCase().includes(req.query.query.toLowerCase()) ||
        ele.address.toLowerCase().includes(req.query.query.toLowerCase())
    );
    // console.log(searchData);
    res.status(200).json({
      success: true,
      message: "Search result",
      data: searchData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const propertyApi = {
  addNewProperty,
  updateProperty,
  deleteProperty,
  getAllProperty,
  getAllPropertyOfUser,
  searchProp,
};

module.exports = propertyApi;
