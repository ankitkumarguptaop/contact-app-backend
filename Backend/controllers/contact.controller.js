const { contactServices } = require("../services");

exports.updateContact = async (req, res) => {
  try {
   const updatedContact = await contactServices.updateContact({
      body: req.body,
      params: req.params,
      thisUser: req.user,
    });
    res.json(updatedContact);
  } catch (error) {
    console.log("Failed to update contacts", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
   const contact=  await contactServices.deleteContact({
      params: req.params,
      thisUser: req.user,
    });
    res.json({
      // message: "Contact Successfuly Deleted",
      contact :contact
    });
  } catch (error) {
    console.log("Failed to delete contacts", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.listContact = async (req, res) => {
  try {
    const contacts = await contactServices.listContact({
      query: req.query,
      params: req.params,
    });
    res.json(contacts);
  } catch (error) {
    console.log("Failed to list contacts", error.message, error.statusCode);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contacts = await contactServices.createContact({
      body: req.body,
    });
    res.json(contacts);
  } catch (error) {
    console.log("Failed to Create contacts", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
