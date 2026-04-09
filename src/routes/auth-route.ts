import { Elysia, t } from "elysia";
import { loginUser } from "../services/auth-service";

export const authRoute = new Elysia({ prefix: "/api" }).post(
  "/users/login",
  async ({ body, set }) => {
    const result = await loginUser(body);
    
    if (!result.success) {
      set.status = 401; // Unauthorized
    }
    
    return result;
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  }
);
