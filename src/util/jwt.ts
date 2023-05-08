import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const createToken = (
  user: {
    email: string;
    username: string;
  },
  duration?: string
) => {
  const token = jwt.sign(
    {
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: duration || "1h", // Set the token expiration time
    }
  );

  return token;
};

type JwtPart = {
  [key: string]: any;
};

function decode(jwt: string): { header: JwtPart; payload: JwtPart } {
  if (!jwt) {
    throw new Error("Invalid JWT");
  }

  const parts = jwt.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const base64UrlDecode = (str: string): string => {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) {
      str += "=";
    }
    return atob(str);
  };

  const parseJson = <T>(json: string): T => {
    try {
      return JSON.parse(json);
    } catch (e: any) {
      throw new Error(`Error parsing JSON: ${e.message}`);
    }
  };

  const headerJson = base64UrlDecode(parts[0]);
  const payloadJson = base64UrlDecode(parts[1]);

  const header = parseJson<JwtPart>(headerJson);
  const payload = parseJson<JwtPart>(payloadJson);

  return {
    header: header,
    payload: payload,
  };
}

export { createToken, decode };
