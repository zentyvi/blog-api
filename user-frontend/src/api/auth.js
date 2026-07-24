import { api_url } from "./config";

async function registerUser(data) {
  const response = await fetch(`${api_url}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}

async function loginUser(data) {
  const response = await fetch(`${api_url}/auth/log-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}

function saveToken(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

function removeToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export { registerUser, loginUser, saveToken, removeToken };
