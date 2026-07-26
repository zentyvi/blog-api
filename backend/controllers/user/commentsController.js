import { prisma } from "../../lib/prisma.js";
import { protectRoute } from "../../middlewares/auth.js";

async function commentDel(req, res, next) {
  try {
    const { commentId } = req.params;
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ message: "Not found" });
    }

    if (!comment.author.id == req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(200).json({ message: "Deletion succeed" });
  } catch (err) {
    next(err);
  }
}

const commentDelete = [protectRoute, commentDel];

const commentsController = {
  commentDelete,
};

export default commentsController;
