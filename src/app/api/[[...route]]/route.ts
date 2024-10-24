import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";

const app = new Hono().basePath("/api");

// app.get("/hello", (c) => {
//   return c.json({ hello: "Hello, World!" });
// });

// app.get("/project/:projectId", (c) => {
//   const { projectId } = c.req.param();

//   return c.json({ project: projectId });
// });

const routes = app
  .route("/auth", auth);

export const Get = handle(app);

export type AppType = typeof routes;