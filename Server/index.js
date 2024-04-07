const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./Routes/userRoutes");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const propertyRouter = require("./Routes/propertyRoutes");
const cors = require("cors");
const multer = require("multer");
const cookiesParser = require("cookie-parser");

dotEnv.config();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(cookiesParser());

async function main() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
}
main();

app.use("/users", routes);
app.use("/property", propertyRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running on port 10000");
});
