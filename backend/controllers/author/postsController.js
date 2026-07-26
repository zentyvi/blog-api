import { validationResult } from "express-validator";
import { prisma } from "../../lib/prisma.js";
import { protectRoute } from "../../middlewares/auth.js";
import validatePost from "../../middlewares/validatePost.js";
import validateComment from "../../middlewares/validateComment.js";

async function myPosts(req, res, next) {
  const { userId } = req.user;

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        _count: {
          select: {
            comments: true,
            likedBy: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

const myPostsGet = [protectRoute, myPosts];

async function postById(req, res, next) {
  try {
    const { userId } = req.user;
    const { postId } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        authorId: userId,
        id: postId,
      },
      select: {
        title: true,
        content: true,
        createdAt: true,
        published: true,
        publishedAt: true,
        updatedAt: true,
        comments: {
          include: {
            author: {
              select: {
                username: true,
                id: true,
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
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

const getPostById = [protectRoute, postById];

async function editPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { postId } = req.params;
    const { title, content } = req.body;
    const { userId } = req.user;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }

    await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({ message: "Editing succeed" });
  } catch (err) {
    next(err);
  }
}

const editPostPut = [protectRoute, validatePost, editPost];

async function publish(req, res, next) {
  try {
    const { postId } = req.params;
    const { userId } = req.user;
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId,
      },
      select: {
        published: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }

    const result = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: !post.published,
        publishedAt: !post.published ? new Date() : null,
      },
    });

    return res.status(200).json({ published: !post.published });
  } catch (err) {
    next(err);
  }
}

const publishPut = [protectRoute, publish];

async function like(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!post) {
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
      isLiked: !Boolean(isLiked.likedPosts[0]),
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
        authorId: userId,
      },
    });

    if (!post) {
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

async function commentDel(req, res, next) {
  try {
    const { userId } = req.user;
    const { commentId } = req.params;
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        post: {
          authorId: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ message: "Not found" });
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

async function createNew(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  const { userId } = req.user;
  const { title, content, published } = req.body;

  await prisma.post.create({
    data: {
      title,
      content,
      published,
      publishedAt: new Date(),
      authorId: userId,
    },
  });

  return res.status(200).json({ message: "Post creation succeed" });
}

const createNewPost = [protectRoute, validatePost, createNew];

async function postDel(req, res, next) {
  try {
    const { userId } = req.user;
    const { postId } = req.params;
    const post = await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ message: "Post deletion succeed" });
  } catch (err) {
    next(err);
  }
}

const postDelete = [protectRoute, postDel];

const postsController = {
  myPostsGet,
  getPostById,
  editPostPut,
  publishPut,
  likePost,
  commentPost,
  commentDelete,
  createNewPost,
  postDelete,
};

export default postsController;
