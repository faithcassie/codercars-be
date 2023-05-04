const express = require("express");
const {
  createCar,
  getCars,
  editCar,
  deleteCar,
} = require("../controllers/car.controller");
const router = express.Router();

// CREATE
router.post("/", createCar); //localhost:8000/car

// READ /car/cars?page
router.get("/", getCars); //localhost:8000/car

// UPDATE
router.put("/:id", editCar); //localhost:8000/car/:id

// // DELETE
router.delete("/:id", deleteCar);

module.exports = router;
