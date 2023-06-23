module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("delivered", "processing", "canceled"),
        defaultValue: "processing",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return order;
};
