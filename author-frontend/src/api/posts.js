import { api_url } from "./config";

async function getMyPosts() {
  const token = localStorage.getItem("token");
  const bearer = token ? `Bearer ${token}` : "";

  const result = await fetch(`${api_url}/posts`, {
    headers: {
      authorization: bearer,
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
  const bearer = token ? `Bearer ${token}` : "";

  const result = await fetch(`${api_url}/posts/${postId}`, {
    headers: {
      authorization: bearer,
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
  const bearer = token ? `Bearer ${token}` : "";

  const result = await fetch(`${api_url}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      authorization: bearer,
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
  const bearer = token ? `Bearer ${token}` : "";

  const result = await fetch(`${api_url}/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      authorization: bearer,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ comment: comment }),
  });

  const response = await result.json();
  return response;
}

async function deleteComment(commentId, postId) {
  const token = localStorage.getItem("token");
  const bearer = token ? `Bearer ${token}` : "";

  const result = await fetch(
    `${api_url}/posts/${postId}/comment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        authorization: bearer,
      },
    },
  );

  if (!result.ok) {
    throw new Error("Error during deleting comment");
  }

  const response = await result.json();
  return response;
}

async function editPost(postId, data) {
  const token = localStorage.getItem("token");
  const bearer = token ? `Bearer ${token}` : "";

  const response = await fetch(`${api_url}/posts/${postId}/edit`, {
    method: "PUT",
    headers: {
      authorization: bearer,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

async function publishPost(postId) {
  const token = localStorage.getItem("token");
  const bearer = token ? `Bearer ${token}` : "";

  const response = await fetch(`${api_url}/posts/${postId}/publish`, {
    method: "PUT",
    headers: {
      authorization: bearer,
    },
  });

  if (!response.ok) {
    throw new Error("Error during publishing post");
  }

  const result = await response.json();
  return result;
}

async function createPost(data) {
  const token = localStorage.getItem("token");
  const bearer = token ? `Bearer ${token}` : "";

  const response = await fetch(`${api_url}/posts/`, {
    method: "POST",
    headers: {
      authorization: bearer,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

async function deletePost(postId) {
  const token = localStorage.getItem("token");
  const bearer = token ? `Bearer ${token}` : "";

  const response = await fetch(`${api_url}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      authorization: bearer,
    },
  });

  if (!response.ok) {
    throw new Error("Error during deleting post");
  }

  const result = await response.json();
  return result;
}

export {
  getMyPosts,
  getSinglePost,
  like,
  comment,
  deleteComment,
  editPost,
  publishPost,
  createPost,
  deletePost,
};
