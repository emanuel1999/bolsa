const { Comment } = require("../models");

const userIsOwnerOrAdmin = async (req, res, next) => {
  const commentId = req.params.id;

  const { roleId, email, id } = req.userAuth;

  const comment = await Comment.findOne({
    where: {
      id: commentId,
    },
  });

  if (comment.user_id == id || roleId == 1) {
    return next()
  } else {
    return res.status(403).json({
        status: "Error",
        message: "This user cannot edit this comment",
      });
  }
};

module.exports = { userIsOwnerOrAdmin };
