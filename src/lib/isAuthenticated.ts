import { type NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export const isAuthenticated = (request: NextRequest) => {
  const token = request.headers.get("Authorization");
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const verified = verify(token, process.env.JWT_SECRET!);
    return verified;
  } catch {
    return null;
  }
};
