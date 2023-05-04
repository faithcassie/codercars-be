const mongoose = require("mongoose");
const Car = require("../models/Car");
const { createCustomError } = require("../middleware/custom-error");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE

    const car = await Car.create(req.body);
    res.status(201).json({ message: "Create Car Successfully!", car });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let offset = limit * (page - 1);
    let cars = await Car.find({});
    console.log(limit);
    console.log(cars.length);
    let total;
    total = Math.ceil(cars.length / limit);
    cars = cars.slice(offset, offset + limit);
    //total page

    console.log(total);
    res.status(200).json({ data: { cars, total } });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const { id: carID } = req.params;
    const car = await Car.findOneAndUpdate({ _id: carID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return next(createCustomError(`No car with id: ${carID}`, 404));
    }
    res.status(200).json({ car });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const { id: carID } = req.params;
    const car = await Car.findOneAndUpdate(
      { _id: carID },
      { isDeleted: true },
      { new: true }
    );
    if (!car) {
      return next(createCustomError(`No car with id: ${carID}`, 404));
    }
    res.status(200).json({ car });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

module.exports = carController;
