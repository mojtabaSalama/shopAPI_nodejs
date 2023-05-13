module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ImgLink: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return product;
};
