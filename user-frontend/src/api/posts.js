import { api_url } from "./config";

async function getPosts() {
  const token = localStorage.getItem("token");
  const result = await fetch(`${api_url}/posts`, {
    headers: {
      authorization: token,
    },
  });
  if (!result.ok) {
    throw new Error("Error during fetching posts");
  }

  const posts = await result.json();
  return posts;
}

async function getSinglePost(postId) {
  const token = localStorage.getItem("token");

  const result = await fetch(`${api_url}/posts/${postId}`, {
    headers: {
      authorization: token || "null",
    },
  });

  if (!result.ok) {
    throw new Error("Error during fetching single post");
  }

  const post = await result.json();
  return post;
}

async function like(postId) {
  const token = localStorage.getItem("token");

  const result = await fetch(`${api_url}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      authorization: token,
    },
  });

  if (!result.ok) {
    throw new Error("Error during like");
  }

  const like = await result.json();
  return like;
}

async function comment(postId, comment) {
  const token = localStorage.getItem("token");

  const result = await fetch(`${api_url}/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ comment: comment }),
  });

  const response = await result.json();
  return response;
}

async function deleteComment(commentId) {
  const token = localStorage.getItem("token");

  const result = await fetch(`${api_url}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  });

  if (!result.ok) {
    throw new Error("Error during deleting comment");
  }

  const response = await result.json();
  return response;
}

export { getPosts, getSinglePost, like, comment, deleteComment };
