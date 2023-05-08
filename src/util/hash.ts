import * as crypto from "crypto";

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const iterations = 100000;
    const keyLength = 64; // 512 bits

    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      "sha512",
      (error, derivedKey) => {
        if (error) {
          reject(error);
        } else {
          const hashedPassword = `${iterations}.${salt}.${derivedKey.toString(
            "hex"
          )}`;
          resolve(hashedPassword);
        }
      }
    );
  });
}

function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [iterations, salt, hash] = storedHash.split(".");

    crypto.pbkdf2(
      password,
      salt,
      parseInt(iterations),
      hash.length / 2,
      "sha512",
      (error, derivedKey) => {
        if (error) {
          reject(error);
        } else {
          const hashedPassword = derivedKey.toString("hex");
          resolve(hashedPassword === hash);
        }
      }
    );
  });
}

export { hashPassword, verifyPassword };
