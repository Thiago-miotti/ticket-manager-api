export function UpdateTicket({ request, response, database }) {
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
}
