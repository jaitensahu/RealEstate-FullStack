const mongoose = require("mongoose");
 
const propertyDetailSchema = new mongoose.Schema({
  beds: {
    type: Number,
    required: true,
  },
  bath: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
  },
});
  
const createProductSchema = new mongoose.Schema({
  image: {
    type: Array,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  details: propertyDetailSchema,
});

const createProdModel = mongoose.model("properties", createProductSchema);
module.exports = createProdModel;
