const axios = require("axios");
const Product = require("../models/ProductModel");

const addData = async () => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log("Data already exists in the database. Skipping insertion.");
      return;
    }
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Product.insertMany(
      data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        sold: item.sold,
        dateOfSale: item.dateOfSale,
      }))
    );

    console.log("Data successfully saved to the database");
  } catch (error) {
    console.error(`Error adding data: ${error.message}`);
  }
  process.exit();
};

module.exports = addData;
