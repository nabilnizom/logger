import Elysia from "elysia";

const PingRoute = new Elysia({prefix: "/ping"})
  .get("/", () => new Response("pong", {status: 201}));
  
export default PingRoute;