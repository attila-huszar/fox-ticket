/* eslint-disable import/no-anonymous-default-export */
import { createServer } from "miragejs";

export default function () {
  createServer({
    routes() {
      this.get("/api/users", () => ({
        users: [
          { id: 1, name: "Joe", age: 20 },
          { id: 2, name: "Franky", age: 30 },
          { id: 3, name: "Saci", age: 40 },
        ],
      }));

      let newId = 4;
      this.post("/api/users", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = newId++;

        return { user: attrs };
      });
    },
  });
}
