import { FastifyInstance } from "fastify";
import { registerPerson } from "./controllers/persons/register-person/register-person";

export async function personRoutes(app: FastifyInstance) {
    app.post('/person/register', registerPerson);
}