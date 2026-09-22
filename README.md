# Odin Blog API

A full-stack RESTful Blog application built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api) curriculum.

---

## Live Preview

- **Frontend for users:** [odin-blog-user.netlify.app](https://odin-blog-user.netlify.app/)
- **Frontend for authors:** [odin-blog-author.netlify.app](https://odin-blog-author.netlify.app/)

---

## Project Overview

The main purpose of this project was to gain practical experience in building and consuming a RESTful API. This repository contains the backend service and two separate frontend clients that interact with the API:

- **Author Portal:** Allows authors to create, edit, publish/unpublish, and delete articles, as well as moderate comments.
- **User Client:** Allows readers to browse articles, like/unlike posts, and participate in discussions by leaving comments (with full control over deleting their own comments).

### Key Features

- **User Profiles:** Users can view their own profile by clicking on their username in the header, or inspect other users' profiles by clicking on their username in comments or article headers. Profiles showcase liked posts and user activity.
- **Account Management:** Both users and authors have full control to delete their accounts directly from their profile page.

---

## Tech Stack

| Frontend                     | Backend                 |
| :--------------------------- | :---------------------- |
| React & React Router         | Node.js & Express       |
| CSS Modules (Custom Styling) | Prisma ORM (PostgreSQL) |
| Fetch API                    | JWT (JSON Web Tokens)   |
