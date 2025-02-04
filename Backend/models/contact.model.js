const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = Schema({
  first_name: {
    type: String,
    required: [true, "Firstname not given"],
  },
  last_name: {
    type: String,
    required: [true, "Lastname not given"],
  },
  phone_no: {
    type: String,
    required: [true, "Phoneno not given"],
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:[true, "user_id not given"]

  },
  relation_id: {
    type: Schema.Types.ObjectId,
    ref: "Relation",
    required:[true, "relation_id not given"]
  },
  is_deleted :{
    type: Boolean,
    default: false,
  }
  
});

contactSchema.index({
  first_name: "text",
  last_name: "text",
  phone_no: "text",
});
exports.Contact = mongoose.model("Contact", contactSchema);
