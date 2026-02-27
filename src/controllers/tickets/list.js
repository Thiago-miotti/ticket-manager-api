export function ListTickets({ request, response, database }) {
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
}
