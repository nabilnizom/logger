import { Elysia } from "elysia";
import router from "./router";
import Loggers from "./middleware/logger";

const app = new Elysia()
  .onBeforeHandle(({ request }) => Loggers.Request({ request }))
  .onError(({ error, request, code }) => Loggers.Error({ error, request, code }))
  .use(router)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.url}`
);
