const { contactModel } = require("../models");
const Contact = contactModel.Contact;
const { NoContent, BadRequest } = require("../libs/error");
const { parse } = require("dotenv");

exports.updateContact = async (payload) => {
  const { body, params } = payload;
  const { id } = params;

  const contact = await Contact.findOneAndUpdate({ _id: id }, body, {
    returnDocument: "after",
  }).populate("relation_id");

  if (!contact) {
    const error = new BadRequest("Contact not found to update ");
    throw error;
  }
  return contact;
};

exports.deleteContact = async (payload) => {
  const { id } = payload.params;
  const contact = await Contact.findOneAndDelete({ _id: id });
  if (!contact) {
    throw new BadRequest("Contact not found to delete ");
  }
  return contact;
};

exports.listContact = async (payload) => {
  const { user_id } = payload.params;
  let { search, relation, favourite, limit = 10, page = 0 } = payload.query;
  page = parseInt(page);
  limit = parseInt(limit);
  if (page === "undefined") {
    page = 0;
  }
  if (limit === "undefined") {
    limit = 10;
  }

  let offset = 0;
  if (page && limit) {
    offset = page * limit;
  }
  const filters = [{ user_id: user_id }];

  if (relation && relation !== "undefined") {
    filters.push({ relation_id: relation });
  }

  if (favourite === "true") {
    filters.push({ favourite: true });
  }

  if (search !== "undefined" && search) {
    filters.push({
      $or: [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { phone_no: { $regex: search, $options: "i" } },
      ],
    });
  }

  const contacts = await Contact.find({ $and: filters })
    .skip(offset)
    .limit(limit)
    .populate("relation_id");
  const totalContacts = await Contact.countDocuments({ $and: filters });

  if (!contacts) {
    const error = new NoContent(" Contacts are not there ");
    throw error;
  }

  const contactPaginationData = {
    contacts,
    page: page,
    totalContacts,
  };

  return contactPaginationData;
};

exports.createContact = async (payload) => {
  const { first_name, last_name, phone_no, relation_id, user_id } =
    payload.body;
  if (!first_name || !last_name || !phone_no || !relation_id || !user_id) {
    const error = new BadRequest("Required data not given");
    throw error;
  }
  const createdContact = await Contact.create(payload.body);

  const createdContctWithRelation = await Contact.findOne({
    _id: createdContact._id,
  }).populate("relation_id");

  return createdContctWithRelation;
};
