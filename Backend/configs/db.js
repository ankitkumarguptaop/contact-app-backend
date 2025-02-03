const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

async function db() {
  await mongoose.connect(uri);
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

module.exports = db;
