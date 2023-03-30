module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "student",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.JSON(),
        defaultValue: [],
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      allowed_devices: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      new_update: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      acc_numbers: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      notes: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      freezTableName: true,
    }
  );

  return student;
};
