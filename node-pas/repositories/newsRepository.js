const { News } = require("../models");

const usersRepositories = {
  getAll: async function (page, size) {
    const news = await News.findAndCountAll({
      attributes: { exclude: ["deletedAt"] },
      include: [
        {
          association: "Category",
          attributes: { exclude: ["deletedAt"] },
        },
      ],
      limit: size,
      offset: page * size,
    });
    return news;
  },
  findByPk: async function (id) {
    const news = await News.findByPk(id, {
      include: [{
        association: 'Category',
        attributes: {exclude:"deletedAt"}
      }],
      attributes:{exclude:"deletedAt"}
    });
    return news;
  },
  create: async function (body) {
    const news = await News.create({
      name: body.name,
      content: body.content,
      image: body.image,
      categoryId: body.categoryId,
    });
    const created = await News.findByPk(news.id,{
      include: [{
        association: 'Category',
        attributes: {exclude:"deletedAt"}
      }],
      attributes:{exclude:"deletedAt"}
    });
    return created;
  },
  update: async function (id, body) {
    const patch = await News.update(
      {
        name: body.name.trim(),
        content: body.content.trim(),
        image: body.image.trim(),
        categoryId: parseInt(body.categoryId.trim()),
      },
      {
        where: {
          id,
        },
      }
    );
    const updated = await News.findByPk(id,{
      include: [{
        association: 'Category',
        attributes: {exclude:"deletedAt"}
      }],
      attributes:{exclude:"deletedAt"}
    });

    return updated;
  },
  destroy: async function (id) {
    const deleted = await News.destroy({
      where: {
        id,
      },
    });
    return deleted;
  },
};

module.exports = usersRepositories;
