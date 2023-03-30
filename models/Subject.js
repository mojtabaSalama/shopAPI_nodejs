module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define(
    "subject",
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
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      chapter_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      freezTableName: true,
    }
  );

  return subject;
};
