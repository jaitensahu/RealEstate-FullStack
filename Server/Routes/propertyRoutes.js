const express = require("express");
const propertyRouter = express.Router();
const propertyApi = require("../Controller/propertyController");

propertyRouter.post("/add", propertyApi.addNewProperty);
propertyRouter.patch("/update", propertyApi.updateProperty);
propertyRouter.delete("/delete", propertyApi.deleteProperty);
propertyRouter.get(`/search`, propertyApi.searchProp);
propertyRouter.get("/", propertyApi.getAllProperty);
propertyRouter.get("/userListing", propertyApi.getAllPropertyOfUser);
  
module.exports = propertyRouter;
