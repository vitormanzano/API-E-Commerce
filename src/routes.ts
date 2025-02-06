import { FastifyInstance } from "fastify";
import { registerPerson } from "./controllers/persons/register-person/register-person";
import { registerProduct } from "./controllers/products/register-product";
import { authenticatePerson } from "./controllers/persons/authenticate-person/authenticate-person";
import { deletePersonByGuid } from "./controllers/persons/delete-person/delete-person";

export async function personRoutes(app: FastifyInstance) {
    app.post('/person/register', registerPerson);
    app.post('/sessions', authenticatePerson);
    app.delete('/person/delete/:guid', deletePersonByGuid);
}

export async function productRoutes(app: FastifyInstance) {
    app.post('/product/register', registerProduct);    
}