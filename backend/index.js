const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");
const addData = require("./utils/addData");

const productsRoute = require("./routes/Routes");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

connectDB().then(() => {
  addData();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", productsRoute); 
