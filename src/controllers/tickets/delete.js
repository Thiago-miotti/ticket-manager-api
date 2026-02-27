export function DeleteTicket({ request, response, database }) {
  database.deleteTicket("tickets", request.params.id);

  if (!request.params.id) {
    return response.end("Ticket não encontrado!");
  }

  return response.end("Ticket deletado com sucesso!");
}
