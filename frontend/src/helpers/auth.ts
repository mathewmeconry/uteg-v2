import { isExpired } from "react-jwt";

export async function getToken(email: string, password: string) {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND_URI || ""}/auth`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const responseBody = await resp.json();
  if (responseBody.message === "Unauthorized") {
    throw new Error("Unauthorized");
  }
  if (!responseBody.token) {
    throw new Error("Unknown");
  }
  localStorage.setItem("token", responseBody.token);
}

export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (isExpired(token || "")) {
    return false;
  }
  return true;
}

export function removeToken() {
  localStorage.removeItem("token");
}
