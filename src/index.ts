import { Elysia } from "elysia";
import router from "./router";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(router)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.url}`
);
