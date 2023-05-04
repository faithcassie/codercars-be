const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const Car = require("./models/Car");
const { MongoClient } = require("mongodb");

const URL = process.env.MONGO_URI;
const results = [];
let collection;
const client = new MongoClient(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
try {
  client.connect();
  const db = client.db("codercars");
  collection = db.collection("cars");
} catch (err) {
  console.log(err);
} finally {
  client.close();
}

fs.createReadStream("carData.csv")
  .pipe(csv())
  .on("data", (row) => {
    const car = new Car({
      make: row.Make,
      model: row.Model,
      release_date: row.Year,
      transmission_type: row["Transmission Type"],
      size: row["Vehicle Size"],
      style: row["Vehicle Style"],
      price: row.MSRP,
      isDeleted: false,
    });

    results.push(car);
  })
  .on("end", () => {
    results.forEach(async (car) => {
      await collection.insertOne(car);
    });

    console.log("CSV data successfully imported into MongoDB Atlas");
  });
