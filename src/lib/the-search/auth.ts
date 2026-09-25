import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE_NAME = "the-search-session";
const SESSION_VALUE = "authenticated";

function getSecret(): string {
  const secret = process.env.THE_SEARCH_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "Missing required environment variable: THE_SEARCH_SESSION_SECRET",
    );
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  return `${SESSION_VALUE}.${sign(SESSION_VALUE)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [value, signature] = token.split(".");
  if (!value || !signature) return false;

  const expected = sign(value);
  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(signature, "hex");

  return (
    value === SESSION_VALUE &&
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.THE_SEARCH_PASSWORD;
  if (!expected) {
    throw new Error(
      "Missing required environment variable: THE_SEARCH_PASSWORD",
    );
  }

  const expectedBuffer = Buffer.from(expected);
  const candidateBuffer = Buffer.from(candidate);

  return (
    expectedBuffer.length === candidateBuffer.length &&
    timingSafeEqual(expectedBuffer, candidateBuffer)
  );
}
