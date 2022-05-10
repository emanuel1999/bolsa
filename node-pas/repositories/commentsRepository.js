const { Comment } = require("../models");

const listAll = async () => {
  return await Comment.findAll({
    attributes: ["body"],
    order: [["createdAt", "DESC"]],
    attributes: { exclude: "deletedAt" },
  });
};
const createComment = async (body, userId) => {
  const newComment = await Comment.create({
    user_id: userId,
    news_id: body.news_id,
    body: body.comment,
  });
  const created = await Comment.findByPk(newComment.id, {
    attributes: { exclude: "deletedAt" },
    attributes: ["body","user_id"],
    order: [["createdAt", "DESC"]],
  });
  return created;
};
const deleteComment = async (id) => {
  const deleted = await Comment.destroy({
    where: {
      id,
    },
  });
  return deleted;
};
const update = async (id, comment) => {
    
    const patch = await Comment.update(
        {
          body: comment.trim(),
        },
        {
          where: {
            id,
          },
        }
      );
      const updated = await Comment.findByPk(id,{
        attributes:{exclude:"deletedAt"}
      });
  
      return updated;
};
const getComments = async (id) =>{
    const list = await Comment.findAll({
        where:{
            news_id:id
        },
        attributes:{exclude:"deletedAt"}
    })
    return list
}


module.exports = { listAll, createComment, deleteComment, update, getComments };

