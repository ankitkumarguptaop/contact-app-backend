const mongoose = require("mongoose");
const { Schema } = mongoose;

const relationSchema = Schema({
  relation_type: {
    type: String,
    enum: ["relatives", "family", "brother", "sister", "friend", "unknown"],
    require: true,
  },
});

exports.Relation = mongoose.model("Relation", relationSchema);
