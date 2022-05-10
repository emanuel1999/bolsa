const {
  listAll,
  create,
  categoryDetail,
  update,
  categoryDelete,
} = require("../repositories/categoriesRepository");

const getCategoriesList = async (req, res) => {
  let {page} = req.query;
  if (!page) page = 1;
  if (!parseInt(page))
    return res.status(403).json({message: `Page doesn't exist`});
  const categories = await listAll(page);
  if (categories.count / 10 < parseInt(page))
    return res.status(403).json({message: `page doesn't exist`});
  if (!categories)
    return res.status(404).json({message: "Categories not found"});

  const previusPage = page <= 1 ? 1 : page - 1;
  const nextPage = page <= categories.count / 10 ? parseInt(page) + 1 : page;

  return res.status(200).json({
    previusPage: `/categories?page=${previusPage}`,
    nextPage: `/categories?page=${nextPage}`,
    categories: categories.rows,
  });
};

const getCategoryDetail = async (req, res) => {
  const category = await categoryDetail(req.params.id);
  if (!category) return res.status(404).json({message: "Category not found"});
  return res.status(200).json(category);
};

const createCategory = async (req, res) => {
  const category = await create(req.body);
  if (!category) return res.status(500).json({message: "Category not created"});
  return res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const {id} = req.params;
  const category = await update(id, req.body);
  if (!category) return res.status(404).json({message: "Category not found"});
  return res.status(200).json({
    message: "Category updated",
    category,
  });
};

const deleteCategory = async (req, res) => {
  const category = await categoryDelete(req.params.id);
  if (!category) return res.status(404).json({message: "Category not found"});
  return res.status(200).json({message: "Category deleted"});
};




module.exports = {
  getCategoriesList,
  createCategory,
  getCategoryDetail,
  updateCategory,
  deleteCategory,
};
