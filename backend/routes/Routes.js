const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getStatistics,
  getBarChart,
  getPieChart,
} = require("../controllers/Controllers");

router.route("/getproducts").get(getAllProducts);
router.route("/stats").get(getStatistics);
router.route("/barchart").get(getBarChart);
router.route("/piechart").get(getPieChart);

module.exports = router;
