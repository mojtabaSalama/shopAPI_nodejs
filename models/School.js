module.exports = (sequelize, DataTypes) => {
  const school = sequelize.define(
    "school",
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
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      level_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      subject_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      student_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      role: {
        type: DataTypes.ENUM("admin", "school"),
      },
    },
    {
      freezTableName: true,
    }
  );

  return school;
};
