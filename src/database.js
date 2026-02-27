import fs from "node:fs/promises";

const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }

  select(table) {
    return this.#database[table] ?? [];
  }

  update(table, ticketId, equipament, description) {
    if (Array.isArray(this.#database[table]) && ticketId) {
      let ticket = this.#database[table].find((tkt) => tkt.id === ticketId);
      if (ticket) {
        ticket.equipament = equipament;
        ticket.description = description;
        this.#persist();

        return ticket;
      } else {
        console.error("Ticket not found");
        return null;
      }
    }

    return null;
  }

  closeTicket(table, ticketId) {
    if (Array.isArray(this.#database[table]) && ticketId) {
      let ticket = this.#database[table].find((tkt) => tkt.id === ticketId);
      if (ticket) {
        ticket.status = "closed";
        this.#persist();

        return ticket;
      } else {
        console.error("Ticket not found");
        return null;
      }
    }

    return null;
  }

  deleteTicket(table, ticketId) {
    if (Array.isArray(this.#database[table]) && ticketId) {
      let ticket = this.#database[table].findIndex(
        (tkt) => tkt.id === ticketId,
      );
      if (ticket !== -1) {
        this.#database[table].splice(ticket, 1);
        this.#persist();

        return this.#database[table];
      } else {
        console.error("Ticket not found");
        return null;
      }
    }

    return null;
  }
}
