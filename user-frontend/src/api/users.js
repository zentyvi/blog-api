import { api_url } from "./config";

async function getUserInfo(userId) {
  const response = await fetch(`${api_url}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Error during fetching user");
  }

  const result = await response.json();

  return result;
}

async function deleteUser(userId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${api_url}/users/${userId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Error during deleting user");
  }

  return true;
}

export { getUserInfo, deleteUser };
