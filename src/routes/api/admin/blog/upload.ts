import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";
import { randomUUID } from "crypto";

export const Route = createFileRoute("/api/admin/blog/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json(
              { error: "Server configuration error." },
              { status: 500 }
            );
          }

          const isValid = await verifyAdminSessionFromRequest(request, sessionSecret);
          if (!isValid) {
            return Response.json({ error: "Unauthorized." }, { status: 401 });
          }

          const contentLength = Number(request.headers.get("content-length") ?? 0);
          if (contentLength > 5 * 1024 * 1024) {
            return Response.json({ error: "File too large (max 5MB)." }, { status: 413 });
          }

          const formData = await request.formData();
          const file = formData.get("file") as File | null;

          if (!file) {
            return Response.json(
              { error: "No file provided" },
              { status: 400 }
            );
          }

          const validTypes = ["image/jpeg", "image/png", "image/webp"];
          if (!validTypes.includes(file.type)) {
            return Response.json(
              { error: "Only JPG, PNG, WebP allowed" },
              { status: 400 }
            );
          }

          if (file.size > 5 * 1024 * 1024) {
            return Response.json({ error: "File exceeds 5MB" }, { status: 413 });
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const uuid = randomUUID();
          const ext = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
          const filename = `${uuid}.${ext}`;
          const path = `posts/${filename}`;

          const buffer = await file.arrayBuffer();
          const { error: uploadError } = await supabaseAdmin.storage
            .from("blog-media")
            .upload(path, new Uint8Array(buffer), {
              contentType: file.type,
              upsert: false,
            });

          if (uploadError) {
            console.error("Blog cover upload error:", uploadError);
            return Response.json({ error: "Failed to upload image." }, { status: 500 });
          }

          return Response.json({ imagePath: path });
        } catch (err) {
          console.error("blog upload error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },
    },
  },
});
