import Elysia from "elysia";
import PingRoute from "./routes/ping";
import ErrorRoute from "./routes/error";

const router = new Elysia()

router
  .use(PingRoute)
  .use(ErrorRoute)

export default router
