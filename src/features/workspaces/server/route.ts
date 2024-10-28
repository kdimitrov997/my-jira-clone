import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

import { zValidator } from "@hono/zod-validator";
import { sessionMiddleware } from "@/lib/session-middleware";
import { MemberRole } from "@/features/members/types";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID, MEMBERS_ID } from "@/config";
import { generateInviteCode } from "@/lib/utils";

import { createWorkspaceSchema } from "../schemas";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [
          // Query.equal("workspaceId", ID.unique()),
          Query.equal("userId", user.$id),
        ],
      );

      if (members.total === 0) {
        return c.json({ data: { documents: [], total: 0 } });
      };

      const workspaceIds = members.documents.map((member) => member.workspaceId);

      const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID,
        [
          Query.orderDesc("$createdAt"),
          Query.contains("$id", workspaceIds),
        ]
      );

      return c.json({ data: workspaces });
    }
  )
  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image } = c.req.valid("form");

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );
        
        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id,
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        { 
          name,
          userId: user.$id,
          uploadedImageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(10),
        },
      );

      await databases.createDocument(
        DATABASE_ID,
        MEMBERS_ID,
        ID.unique(),
        { 
          userId: user.$id,
          workspaceId: workspace.$id,
          role: MemberRole.ADMIN,
        },
      );

      return c.json({ data: workspace });
    }
  );

export default app;