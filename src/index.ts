import { Elysia } from "elysia";
import { usersRoute } from "./routes/users-route";
import { authRoute } from "./routes/auth-route";

const app = new Elysia()
  .get("/", () => "Hello World")
  .use(usersRoute)
  .use(authRoute)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
