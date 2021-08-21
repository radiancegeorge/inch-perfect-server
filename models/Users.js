module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Users", {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    currency: {
      type: DataTypes.ENUM("USD", "NGN"),
      allowNull: false,
      defaultValue: "USD",
    },
    active: {
      type: DataTypes.ENUM("1", "2"),
      allowNull: false,
      defaultValue: "2",
    },
    verified: {
      type: DataTypes.ENUM("1", "2"),
      allowNull: false,
      defaultValue: "1",
    },
  });
};
