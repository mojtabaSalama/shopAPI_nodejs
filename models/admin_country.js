module.exports = (sequelize, DataTypes) => {
  const admin_country = sequelize.define(
    "admin_country",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return admin_country;
};
