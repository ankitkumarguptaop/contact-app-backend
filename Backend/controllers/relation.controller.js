
const {relationServices} =require("../services")

exports.listRelation = async (req, res) => {
    try {
      const relations = await relationServices.listRelation();
      res.json(relations);
    } catch (error) {
      console.log("Failed to list contacts", error.message, error.statusCode);
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };