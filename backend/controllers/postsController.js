import { validationResult } from "express-validator";
import { prisma } from "../lib/prisma.js";
import { protectRoute } from "../middlewares/auth.js";
import validateComment from "../middlewares/validateComment.js";

async function getPublishedPosts(req, res, next) {
  try {
    const userId = req.user?.id || "null";
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        likedBy: {
          where: {
            id: userId,
          },
        },
        author: {
          select: { username: true },
        },
        _count: {
          select: { comments: true, likedBy: true },
        },
      },
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

async function getPostsById(req, res, next) {
  try {
    const userId = req.user?.userId || "null";
    const { postId } = req.params;
    const post = await prisma.post.findFirst({
      where: {
        AND: [{ id: postId }, { published: true }],
      },
      include: {
        createdAt: false,
        published: false,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        likedBy: {
          where: {
            id: userId,
          },
        },
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

async function like(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post || !post.published) {
      return res.status(404).json({ message: "Not found" });
    }

    const isLiked = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        likedPosts: {
          where: {
            id: postId,
          },
          select: {
            title: true,
          },
        },
      },
    });

    if (isLiked.likedPosts.length > 0) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          likedPosts: {
            disconnect: {
              id: postId,
            },
          },
        },
      });
    } else {
      const l = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          likedPosts: {
            connect: {
              id: postId,
            },
          },
        },
        select: {
          likedPosts: {
            where: {
              id: postId,
            },
          },
        },
      });
    }

    const newLikes = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      select: {
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
    });

    return res.status(200).json({
      totalPostLikes: newLikes._count.likedBy,
      isLiked: !isLiked,
    });
  } catch (error) {
    next(error);
  }
}

const likePost = [protectRoute, like];

async function comment(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const userId = req.user.userId;
    const { postId } = req.params;
    const { comment } = req.body;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post || !post.published) {
      return res.status(404).json({ message: "Not found" });
    }

    const result = await prisma.comment.create({
      data: {
        content: comment,
        authorId: userId,
        postId: postId,
      },
    });

    return res.status(200).json({ message: "Deletion succeed" });
  } catch (err) {
    next(err);
  }
}

const commentPost = [protectRoute, validateComment, comment];

const postsController = {
  getPublishedPosts,
  getPostsById,
  likePost,
  commentPost,
};

export default postsController;
