module.exports = (sequelize, DataTypes) => {
  const quiz = sequelize.define(
    "quiz",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("online", "offline"),
        allowNull: false,
      },
      q_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      std_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      full_grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      q_grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return quiz;
};
