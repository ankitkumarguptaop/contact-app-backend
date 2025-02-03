
const { Relation } = require("../models/relation.model");
const {
    ForBidden,
    NoContent,
    UnAuthorized,
    NotFound,
    BadRequest,
  } = require("../libs/error");
exports.listRelation = async () => {
    const relations = await Relation.find();
    if(!relations){
        throw new NoContent("Cannot get relations")
    }
    return relations;
  };
  