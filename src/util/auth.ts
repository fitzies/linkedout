import { cookies } from "next/headers";
import { createToken, decode } from "./jwt";

const createAccount = (
  username: string,
  email: string,
  password: string,
  callback: Function
) => {
  const isValidEmail = (x: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);

  if (!isValidEmail(email)) {
    alert("Please enter a valid email");
  }

  const URL = process.env.URL || "http://localhost:3000";

  fetch(`${URL}/api/auth/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      callback(); //redirect
      if (data === false) {
        alert("User already exists");
      }
    })
    .catch((error) => {
      console.error("Error during sign up:", error);
    });
};

const signInUser = (email: string, password: string, callback: Function) => {
  const isValidEmail = (x: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);

  if (!isValidEmail(email)) {
    alert("Please enter a valid email");
  }

  const URL = process.env.URL || "http://localhost:3000";

  fetch(`${URL}/api/auth/signin/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      callback(); //redirect
      if (data === false) {
        alert("Wrong email or password");
      }
    })
    .catch((error) => {
      console.error("Error during sign up:", error);
    });
};

export { createAccount, signInUser };
