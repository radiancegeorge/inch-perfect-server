module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Products", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      uique: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_usd: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price_ngn: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rating: {
      type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
      allowNull: false,
      defaultValue: "0",
    },
    product_detail: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    product_image: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    pattern: {
      type: DataTypes.ENUM("1", "2"),
      allowNull: false,
      defaultValue: "1",
    },
    sizes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sold_out: {
      allowNull: false,
      type: DataTypes.ENUM("1", "2"),
      defaultValue: "1",
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
