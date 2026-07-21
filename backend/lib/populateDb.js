import { prisma } from "./prisma.js";
import bcrypt from "bcryptjs";

if (!process.env.DATABASE_URL) {
  console.log("Please provide a database url inside your .env file");
  process.exit(1);
}

async function main() {
  console.log("Starting database cleanup...");

  // Delete records in reverse order of dependencies
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Database cleaned successfully.");

  console.log("Creating users...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const author = await prisma.user.create({
    data: {
      username: "john_author",
      email: "author@example.com",
      password: hashedPassword,
      role: "Author",
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      username: "jane_reader",
      email: "reader@example.com",
      password: hashedPassword,
      role: "User",
    },
  });

  console.log("Users created.");

  console.log("Creating posts and comments...");

  // Post 1: Published with comments
  const post1 = await prisma.post.create({
    data: {
      title: "Getting Started with Node.js",
      content:
        "Node.js is an open-source, cross-platform JavaScript runtime environment. It allows developers to run JavaScript code outside of a web browser.",
      published: true,
      publishedAt: new Date(),
      authorId: author.id,
      comments: {
        create: [
          {
            content:
              "Great introduction to Node.js! Looking forward to more posts.",
            authorId: regularUser.id,
          },
          {
            content: "Thanks for sharing this, very useful information.",
            authorId: regularUser.id,
          },
        ],
      },
    },
  });

  // Post 2: Published with one comment
  const post2 = await prisma.post.create({
    data: {
      title: "Understanding Database Relationships with Prisma",
      content:
        "Prisma ORM simplifies database access and management in Node.js applications. Modeling relations between users, posts, and comments becomes straightforward.",
      published: true,
      publishedAt: new Date(),
      authorId: author.id,
      comments: {
        create: [
          {
            content: "Prisma really makes working with databases much easier.",
            authorId: regularUser.id,
          },
        ],
      },
    },
  });

  // Post 3: Draft/Published without comments
  const post3 = await prisma.post.create({
    data: {
      title: "Future Plans for My Blog",
      content:
        "In the coming weeks, I will be sharing more articles about fullstack development. Stay tuned for new updates and features.",
      published: true,
      publishedAt: new Date(),
      authorId: author.id,
    },
  });

  console.log("Posts and comments created successfully.");
  console.log("Database seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
