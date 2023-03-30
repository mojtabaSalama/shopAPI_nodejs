module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define(
    "answer",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return answer;
};
