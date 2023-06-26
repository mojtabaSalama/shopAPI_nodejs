module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define(
    "order_item",
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

      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return order_item;
};
