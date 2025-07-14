import Elysia from "elysia";
import logger from "../utils/logger";

const ErrorRoute = new Elysia({ prefix: "/error" })
  .get("/", ({request}) => {
    logger("An error occurred while processing the request", "error", {
      req: request,
      traceId: "12345"
    });

    return new Response("An error occurred", { status: 500 });
  });

export default ErrorRoute;
