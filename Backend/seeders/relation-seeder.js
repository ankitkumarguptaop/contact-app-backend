const dotenv = require("dotenv");
dotenv.config();
const db = require("../configs/db");
db();
const relation = require(".relation-data");
const Model = require("../models/relation.model");
const Relation = Model.Relation;

const importRelations = async () => {
  try {
    await Relation.insertMany(relation.relation);
  } catch (error) {
    console.error(error);
  }
};

const destroyRelation = async () => {
  try {
    await Relation.deleteMany();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-d") {
  destroyRelation();
} else {
  importRelations();
}
