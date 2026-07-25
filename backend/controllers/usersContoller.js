import { prisma } from "../lib/prisma.js";
import { protectRoute } from "../middlewares/auth.js";

async function getUserById(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        username: true,
        id: true,
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
        likedPosts: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
            _count: {
              select: {
                likedBy: true,
                comments: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { userId } = req.params;
    if (!userId === req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return res.status(200).json({ message: "Deletion succeed" });
  } catch (err) {
    next(err);
  }
}

const userDelete = [protectRoute, deleteUser];

const usersContorller = { getUserById, userDelete };

export default usersContorller;
