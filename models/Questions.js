module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define(
    "questions",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
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
      },
      defficulty: {
        type: DataTypes.ENUM("easy", "medium", "hard"),
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
