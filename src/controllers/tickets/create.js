import { randomUUID } from "crypto";

export function CreateTicket({ request, response, database }) {
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
    .end(JSON.stringify({ equipament, description, user_name, id, status }));
}
