const { Op } = require("sequelize");
const { Categories } = require("../../models");
const uuid = require("uuid").v1;

const getCategories = async () => {
  return await Categories.findAll();
};

const addCategory = async (name) => {
  if (await checkCategory(name)) throw "category already exists!";
  if (!name || name?.trim() === "") throw "category name cannot be empty";
  try {
    const id = uuid();
    await Categories.create({
      id,
      category: name,
    });
    return {
      id,
      name,
    };
  } catch (error) {
    console.log(error);
    throw "there was an error with creating category";
  }
};

const checkCategory = async (category) => {
  const exists = (
    await Categories.findOne({
      where: {
        category: {
          [Op.like]: `%${category}%`,
        },
      },
    })
  )?.dataValues;

  return exists;
};

const removeCategory = async (id) => {
  try {
    await Categories.destroy({
      where: {
        id: {
          [Op.like]: `%${id}%`,
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    throw "there was an error deleting category";
  }
};

module.exports = {
  removeCategory,
  checkCategory,
  addCategory,
  getCategories,
};
