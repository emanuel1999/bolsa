const db = require("../models");
const { getAllNews, getNewsById, postNews, updateOne, deleteOne, getCommentsByNews } = require("../services/newsService");

const newsController = {
  getNewsList: async (req, res) => {
    await getAllNews(req,res)
  },
  getSingle: async (req, res) => {
    await getNewsById(req, res)
  },
  createNews: async (req, res) => {
    await postNews(req, res)
  },
  updateNews: async (req, res) => {
    await updateOne(req, res)
  },
  deleteNews: async (req, res) => {
    await deleteOne(req, res)
  },
  getComments: async (req,res)=>{
   await getCommentsByNews(req, res)
  },
};

module.exports = newsController;
