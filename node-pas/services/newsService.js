const { getComments } = require("../repositories/commentsRepository");
const { findByPk, getAll, create, update, destroy } = require("../repositories/newsRepository");

const newsService = {
  getAllNews: async (req, res) => {
    let { page, size, prevPage } = req.query;

    const news = await getAll(page, size);

    try {
      if (news != undefined) {
        res.status(200).json({
          status: "OK",
          totalPages: Math.ceil(news.count / size),
          page: page,
          nextPage: page + 1,
          previousPage: prevPage,
          content: news.rows,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no news to show.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error getting the news",
      }),
        console.log(errors);
    }
  },
  getNewsById: async function (req, res) {
    let { id } = req.params;

    const news = await findByPk(id);

    try {
      if (news) {
        res.status(200).json({
          status: "OK",
          news,
        });
      } else {
        res.status(400).json({ 
          status: "error",
          message: "Sorry, there are no news with this id.",
           });
      }
    } catch (errors) {
      res.status(400).json({ msg: "Error getting the news" }),
        console.log(errors);
    }
  },
  postNews: async function (req, res) {
    let body = req.body;

    const news = await create(body);

    try {
      if (news) {
        res.status(200).json({
          status: "OK",
          message: "News created!",
          news,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Error creating the news",
        });
      }
    } catch (errors) {
      res.status(400).json({
        status: "error",
        message: "Error creating the news",
      }),
        console.log(errors);
    }
  },
  updateOne: async function (req, res) {
    const { id } = req.params;
    const body = req.body;

    const news = await update(id, body);

    try {
      if (news) {
        res.status(201).json({
          status: "OK",
          message: "News updated!",
          news,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no news with this id.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error updating the news",
        errors,
      }),
        console.log(errors);
    }
  },
  deleteOne: async function (req, res) {
    const { id } = req.params;

    const news = await destroy(id);

    try {
      if (news) {
        res.status(200).json({
          status: "OK",
          message: "News deleted!",
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no news with this id.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error deleting the news",
        errors,
      }),
        console.log(errors);
    }
  },
  getCommentsByNews: async function (req, res) {

    const { id } = req.params;

    const comments = await getComments(id);

    try {
      if (comments != undefined) {
        res.status(200).json({
          status: "OK",
          comments
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no comments to show.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error getting the comments",
      }),
        console.log(errors);
    }
  },
};

module.exports = newsService;
