module.exports = (sequelize, DataTypes) => {
  const chapter = sequelize.define(
    "chapter",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return chapter;
};
