const usersModel = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Queries, {
      foreignKey: "userId", // same FK
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Users;
};

export default usersModel;
