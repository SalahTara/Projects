const queriesModel = (sequelize, DataTypes) => {
  const Queries = sequelize.define("Queries", {
      prompt: {
      type: DataTypes.STRING,
      allowNull: false,
  },
	query: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Queries;
};

export default queriesModel;