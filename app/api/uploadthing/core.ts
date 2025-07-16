import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req, files }) => {
      // This code runs on your server before upload
      console.log("Files being uploaded:", files);

      // Validate file type
      const file = files[0];
      if (!file.type.includes("pdf")) {
        throw new UploadThingError("Only PDF files are allowed");
      }

      // You can add authentication here if needed
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        uploadedBy: user.id || "anonymous", // Use actual user ID
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.uploadedBy);
      console.log("File URL:", file.url);
      console.log("File name:", file.name);
      console.log("File size:", file.size);
      console.log("File key:", file.key);

      // Save upload info to database if needed
      // await db.files.create({
      //   data: {
      //     url: file.url,
      //     name: file.name,
      //     size: file.size,
      //     key: file.key,
      //     uploadedBy: metadata.uploadedBy,
      //   },
      // });

      // Return data to the client
      return {
        uploadedBy: metadata.uploadedBy,
        url: file.url,
        name: file.name,
        size: file.size,
        key: file.key,
        success: true,
        message: "PDF uploaded successfully!",
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
