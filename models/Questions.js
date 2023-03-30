module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define(
    "questions",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      q_text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Right_ans: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      q_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      time: {
        type: DataTypes.TIME,
      },
    },
    {
      freezTableName: true,
    }
  );

  return questions;
};
