const db = require("../../models/index");
const Quiz = db.models.quiz;
const Schools = db.models.school;

const quiz = {
  getOnline: async (req, res) => {
    try {
    } catch (error) {
      if (error) throw error;
    }
  },
  getOffline: async (req, res) => {
    try {
      const { userId } = req.body;
      //check existence
      if (!userId) return res.status(400).json(" bad request ");
    } catch (error) {
      if (error) throw error;
    }
  },
  download: async (req, res) => {
    try {
    } catch (error) {
      if (error) throw error;
    }
  },
  getSchools: async (req, res) => {
    try {
      //simple api to return a list of the current schools
      let schools = await Schools.findAll({});

      if (schools) {
        res.json({ schools });
      } else {
        res.json("schools not found");
      }
    } catch (error) {
      if (error) throw error;
    }
  },
};

module.exports = quiz;