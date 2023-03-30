module.exports = (sequelize, DataTypes) => {
  const result = sequelize.define(
    "result",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      full_grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return result;
};
