import { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/users/register-user/register-user";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', registerUser);
}