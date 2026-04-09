import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api" }).post(
  "/users",
  async ({ body, set }) => {
    const result = await registerUser(body);
    
    if (!result.success) {
      set.status = 400; // Bad Request
    } else {
      set.status = 201; // Created
    }
    
    return result;
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  }
);
