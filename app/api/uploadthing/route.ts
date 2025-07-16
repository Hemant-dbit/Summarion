import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/app/api/uploadthing/core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Optional: Add config for your specific setup
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
