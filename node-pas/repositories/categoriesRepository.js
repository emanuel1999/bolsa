const { Categories } = require('../models/index');


const listAll = async (page) => {
    return await Categories.findAndCountAll({
        limit: 10,
        offset: (parseInt(page) - 1) * 10,
        attributes: ['name']
    });
}

const categoryDetail = async (id) => {
    const category = await Categories.findOne({
        where: { id },
        attributes: ['id', 'name', 'description', 'image', 'createdAt', 'updatedAt'],
    });
    return category;
}

const create = async (body) => {
    const category = await Categories.create({
        name: body.name,
        description: body.description,
        image: body.image,
    });
    return category;
}

const update = async (id, body) => {
    const category = await Categories.findOne({ where: { id } });
    if (!category) return false;
    const { name, description, image } = body;
    const update = {}
    if (name) update.name = name;
    if (description) update.description = description;
    if (image) update.image = image;
    await category.update(update);
    return category;
}

const categoryDelete = async (id) => {
    const category = await Categories.destroy({
        where: { id },
    });
    if(!category) return false;
    return true;
}




module.exports = { listAll, create, categoryDetail, categoryDelete, update };
