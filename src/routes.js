import { randomUUID } from "crypto";
import { parseRoutePath } from "./utils/parseRoutePath.js";

export const routes = [
  {
    method: "GET",
    path: "/tickets",
    controller: ({ request, response, database }) => {
      const tickets = database.select("tickets");

      if (request.query.status === "open") {
        const ticketsOpen = tickets.filter((ticket) => {
          return ticket.status === "open";
        });

        return response.end(JSON.stringify(ticketsOpen));
      }

      if (request.query.status === "closed") {
        const ticketsClosed = tickets.filter((ticket) => {
          return ticket.status === "closed";
        });

        return response.end(JSON.stringify(ticketsClosed));
      }

      return response.end(JSON.stringify(tickets));
    },
  },
  {
    method: "POST",
    path: "/tickets",
    controller: ({ request, response, database }) => {
      const id = randomUUID();
      const status = "open";
      const { equipament, description, user_name } = request.body;
      database.insert("tickets", {
        equipament,
        description,
        user_name,
        id,
        status,
      });
      return response
        .writeHead(201)
        .end(
          JSON.stringify({ equipament, description, user_name, id, status }),
        );
    },
  },
  {
    method: "PUT",
    path: "/tickets/:id",
    controller: ({ request, response, database }) => {
      const { equipament, description } = request.body;
      const ticket = database.update(
        "tickets",
        request.params.id,
        equipament,
        description,
      );

      if (!request.params.id) {
        return response.end("Ticket não encontrado!");
      }

      return response.end(JSON.stringify(ticket));
    },
  },
  {
    method: "PATCH",
    path: "/tickets/:id/status",
    controller: ({ request, response, database }) => {
      database.closeTicket("tickets", request.params.id);

      if (!request.params.id) {
        return response.end("Ticket não encontrado!");
      }

      return response.end("Ticket concluído com sucesso!");
    },
  },
  {
    method: "DELETE",
    path: "/tickets/:id",
    controller: ({ request, response, database }) => {
      database.deleteTicket("tickets", request.params.id);

      if (!request.params.id) {
        return response.end("Ticket não encontrado!");
      }

      return response.end("Ticket deletado com sucesso!");
    },
  },
].map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}));
