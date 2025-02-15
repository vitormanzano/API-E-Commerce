import { FastifyInstance } from "fastify";
import { registerPerson } from "./controllers/persons/register-person/register-person";
import { registerProduct } from "./controllers/products/register-product";
import { authenticatePerson } from "./controllers/persons/authenticate-person/authenticate-person";
import { deletePersonByGuid } from "./controllers/persons/delete-person/delete-person";
import { refresh } from "./controllers/persons/refresh/refresh";
import { profile } from "./controllers/persons/profile/profile";
import { verifyJWT } from "./controllers/middlewares/verify-jwt";

export async function personRoutes(app: FastifyInstance) {
    app.post('/person/register', registerPerson);
    app.post('/sessions', authenticatePerson);
    app.delete('/person/delete', {onRequest: verifyJWT}, deletePersonByGuid);
    app.patch('/token/refresh', refresh);

    app.get('/me', {onRequest: verifyJWT}, profile)
}

export async function productRoutes(app: FastifyInstance) {
    app.post('/product/register', {onRequest: verifyJWT} ,registerProduct);    
}