export function UpdateTicketStatus({ request, response, database }) {
  database.closeTicket("tickets", request.params.id);

  if (!request.params.id) {
    return response.end("Ticket não encontrado!");
  }

  return response.end("Ticket concluído com sucesso!");
}
