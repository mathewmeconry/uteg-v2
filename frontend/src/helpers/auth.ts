import { decodeToken, isExpired } from "react-jwt";

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

export async function authWithJudgeToken(token: string) {
  const resp = await fetch(
    `${import.meta.env.VITE_BACKEND_URI || ""}/auth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }
  );

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

export function getTokenData<T>(): T | null {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return decodeToken<T>(token);
}

export function removeToken() {
  localStorage.removeItem("token");
}
