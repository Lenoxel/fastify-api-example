import Fastify from "fastify";
import { createRoutes } from "./routes.mjs";
import { runServer } from "./server.mjs";

const fastify = Fastify({
  logger: true,
});

createRoutes(fastify);

runServer(fastify);
