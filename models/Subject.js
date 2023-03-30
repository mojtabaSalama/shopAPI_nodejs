module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define(
    "subject",
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
