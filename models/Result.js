module.exports = (sequelize, DataTypes) => {
  const result = sequelize.define(
    "result",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
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
