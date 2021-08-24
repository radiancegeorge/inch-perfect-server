module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Categories", {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    category: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  });
};
