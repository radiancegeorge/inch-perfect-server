module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Orders", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    town: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    processing: {
      allowNull: false,
      type: DataTypes.ENUM("1", "2"),
      defaultValue: "1",
    },
    shipped: {
      allowNull: false,
      type: DataTypes.ENUM("1", "2"),
      defaultValue: "1",
    },
    delivered: {
      allowNull: false,
      type: DataTypes.ENUM("1", "2"),
      defaultValue: "1",
    },
    coupon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    method: {
      type: DataTypes.ENUM("MANUAL", "AUTOMATIC"),
      allowNull: false,
      defaultValue: "AUTOMATIC",
    },
    currency: {
      type: DataTypes.ENUM("USD", "NGN"),
      allowNull: false,
    },
    referrence: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  });
};
