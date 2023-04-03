const db = require("../../models/index");
const Result = db.models.result;

const result = {
  showAll: async (req, res) => {
    try {
    } catch (error) {
      if (error) throw error;
    }
  },
  save: async (req, res) => {
    try {
      const { userId } = req.body;
      //check existence
      if (!userId) return res.status(400).json(" bad request ");
    } catch (error) {
      if (error) throw error;
    }
  },
  filter: async (req, res) => {
    try {
    } catch (error) {
      if (error) throw error;
    }
  },
};

module.exports = result;
