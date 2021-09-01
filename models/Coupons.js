module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Coupons", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    allowed_usage: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    percentage_off: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
      defaultValue: 10,
    },
    usage_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
