const queriesModel = (sequelize, DataTypes) => {
  const Queries = sequelize.define("Queries", {
    prompt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      // <-- MUST exist here
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" }, // table name
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  Queries.associate = (models) => {
    Queries.belongsTo(models.Users, {
      foreignKey: "userId", // FK column in Queries table
      onDelete: "CASCADE", // delete queries if the user is deleted
      onUpdate: "CASCADE",
    });
  };

  return Queries;
};

export default queriesModel;
