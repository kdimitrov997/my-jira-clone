import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";

const app = new Hono()
  .post(
    "/login", 
    zValidator("json", loginSchema),
    async (c) => {
      const { email, password } = c.req.valid('json');

      const { account } = await createAdminClient();
      const { session } = await account.createEmailPasswordSession(
        email,
        password,
      );

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000 * 24 * 30, // 30 days
      })

      return c.json({ success: true });
    }
  )
  .post(
    "/register", 
    zValidator("json", registerSchema),
    async (c) => {
      const { name, email, password } = c.req.valid('json');

      const { account } = await createAdminClient();
      await account.create(
        ID.unique(), 
        email, 
        password, 
        name);

      const session = await account.createEmailPasswordSession(
        email,
        password,
      );
      
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000 * 24 * 30, // 30 days
      })

      return c.json({ success: true });
    }
  );

export default app;