const { listAll, createComment, deleteComment, update } = require("../repositories/commentsRepository");


const getCommentsList = async (req, res) => {
  const comments = await listAll();
  if (!comments)
    return res.status(404).json({ message: "No se encontraron comentarios" });
  return res.status(200).json(comments);
};
const postComment = async (req, res) => {
  let body = req.body;
  let userId = req.userAuth.id


  const created = await createComment(body, userId);

  try {
    if (created) {
      res.status(200).json({
        status: "OK",
        message: "Comment posted",
        created,
      });
    } else {
      res.status(400).json({ msg: "Error creating the comment" });
    }
  } catch (errors) {
    res.status(400).json({ msg: "Error creating the comment" }),
      console.log(errors);
  }
};
const deleteOne = async (req, res) => {
    const { id } = req.params;

    const comment = await deleteComment(id);

    try {
      if (comment) {
        res.status(200).json({
          status: "OK",
          message: "Comment deleted!",
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no comments with this id.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error deleting the comment",
        errors
      }),
        console.log(errors);
    }
  }
const updateComment=async(req,res)=>{
    const { comment } = req.body
    const { id } = req.params

    const commentsUpdate=await update(id, comment)
    if (!commentsUpdate) return res.status(404).json({message:'No se actualizó el comentario'});
    return res.status(200).json(commentsUpdate)

}


module.exports = { getCommentsList, postComment, deleteOne, updateComment };

