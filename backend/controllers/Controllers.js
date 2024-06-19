const Product = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
  try {
    const { search = "", page = 1, perPage = 10, month } = req.query;

    const pageInt = parseInt(page, 10);
    const perPageInt = parseInt(perPage, 10);
    console.log(req.query);

    console.log(pageInt, perPageInt, month, search);

    let query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    if (month !== "all") {
      const monthNumber = new Date(`${month} 1, 2000`).getMonth();
      console.log("Month Number:", monthNumber + 1);
      query = {
        ...query,
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber + 1] },
      };
    }

    const limit = perPageInt;
    const skip = (pageInt - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(limit);

    const totalCount = await Product.countDocuments(query);
    res.json({
      products,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: pageInt,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getStatistics = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const products = await Product.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    let totalSaleAmount = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    products.forEach((product) => {
      if (product.sold) {
        totalSaleAmount += product.price;
        totalSoldItems++;
      } else {
        totalNotSoldItems++;
      }
    });

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBarChart = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const products = await Product.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    products.forEach((product) => {
      const price = product.price;
      if (price <= 100) {
        priceRanges["0-100"]++;
      } else if (price <= 200) {
        priceRanges["101-200"]++;
      } else if (price <= 300) {
        priceRanges["201-300"]++;
      } else if (price <= 400) {
        priceRanges["301-400"]++;
      } else if (price <= 500) {
        priceRanges["401-500"]++;
      } else if (price <= 600) {
        priceRanges["501-600"]++;
      } else if (price <= 700) {
        priceRanges["601-700"]++;
      } else if (price <= 800) {
        priceRanges["701-800"]++;
      } else if (price <= 900) {
        priceRanges["801-900"]++;
      } else {
        priceRanges["901-above"]++;
      }
    });

    res.json(priceRanges);
    console.log("Price Ranges:", priceRanges);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getPieChart = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const products = await Product.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const categoryCount = {};

    products.forEach((product) => {
      if (categoryCount[product.category]) {
        categoryCount[product.category]++;
      } else {
        categoryCount[product.category] = 1;
      }
    });

    const response = Object.keys(categoryCount).map((category) => ({
      category,
      count: categoryCount[category],
    }));

    res.json(response);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllProducts, getStatistics, getBarChart, getPieChart };
