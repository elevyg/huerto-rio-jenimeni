import type { NextRequest } from "next/server";
import { isAuthenticated } from "~/lib/isAuthenticated";

// Limit the middleware to paths starting with `/api/`

export default function middleware(request: NextRequest) {
  console.log("middleware");
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 },
    );
  }
}

export const config = {
  matcher: "/api/sendEmail/:path*",
};
