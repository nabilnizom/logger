import Elysia from "elysia";

const ErrorRoute = new Elysia({ prefix: "/error" })
  .get("/", async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500));

    throw new Error("This is a simulated error for testing purposes.");
  });

export default ErrorRoute;
