module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define(
    "product_category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return product_category;
};
