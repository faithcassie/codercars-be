const express = require("express");
const router = express.Router();

// CAR
const carAPI = require("./car.api");
// router.use("/car", carAPI);
router.use("/cars", carAPI);

module.exports = router;
