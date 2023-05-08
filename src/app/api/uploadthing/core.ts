import { NextRequest } from "next/server";
import { createFilething, type FileRouter } from "uploadthing/server";
const f = createFilething();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f
    // Set permissions and file types for this FileRoute
    .fileTypes(["image", "video"])
    .maxSize("1GB")
    .middleware(async (req) => {
      // This code runs on your server before upload
      // const user = await isAuthenticated(req)
      // If you throw, the user will not be able to upload
      // if (!user) throw new Error("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // return { userId: user.id };
      return { userId: 0 };
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
