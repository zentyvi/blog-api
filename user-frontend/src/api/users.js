import { api_url } from "./config";

async function getUserInfo(userId) {
  const response = await fetch(`${api_url}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Error during fetching user");
  }

  const result = await response.json();

  return result;
}

export { getUserInfo };
