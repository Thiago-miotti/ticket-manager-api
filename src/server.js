import http from "node:http";
import { routeHandler } from "./middlewares/routeHandler.js";
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js";

const server = http.createServer(async (request, response) => {
  await jsonBodyHandler(request, response);
  routeHandler(request, response);
});

server.listen(3333);
