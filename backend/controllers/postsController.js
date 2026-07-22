import { prisma } from "../lib/prisma.js";

async function getPublishedPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: { username: true },
        },
        _count: {
          select: { comments: true },
        },
      },
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function getPostsById(req, res, next) {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findFirst({
      where: {
        AND: [{ id: postId }, { published: true }],
      },
      include: {
        comments: true,
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
}

const postsController = {
  getPublishedPosts,
  getPostsById,
};

export default postsController;
