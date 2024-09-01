import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing({
  errorFormatter: (err) => {
    const fileMissMatch = err.message.includes("FileSizeMismatch");
    if (fileMissMatch) {
      return {
        message: "El archivo es demasiado grande",
      };
    }
    return {
      message: "Hubo un error al subir tu video",
    };
  },
});

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "16MB" } }).onUploadComplete(
    async ({ file }) => {
      return { url: file.url };
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
