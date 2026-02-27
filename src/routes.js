import { parseRoutePath } from "./utils/parseRoutePath.js";
import { ListTickets } from "./controllers/tickets/list.js";
import { CreateTicket } from "./controllers/tickets/create.js";
import { UpdateTicket } from "./controllers/tickets/update.js";
import { UpdateTicketStatus } from "./controllers/tickets/update-status.js";
import { DeleteTicket } from "./controllers/tickets/delete.js";

export const routes = [
  {
    method: "GET",
    path: "/tickets",
    controller: ListTickets,
  },
  {
    method: "POST",
    path: "/tickets",
    controller: CreateTicket,
  },
  {
    method: "PUT",
    path: "/tickets/:id",
    controller: UpdateTicket,
  },
  {
    method: "PATCH",
    path: "/tickets/:id/status",
    controller: UpdateTicketStatus,
  },
  {
    method: "DELETE",
    path: "/tickets/:id",
    controller: DeleteTicket,
  },
].map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}));
