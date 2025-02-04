import { FastifyInstance } from "fastify";
import { registerPerson } from "./controllers/persons/register-person/register-person";
import { registerProduct } from "./controllers/products/register-product";

export async function personRoutes(app: FastifyInstance) {
    app.post('/person/register', registerPerson);
}

export async function productRoutes(app: FastifyInstance) {
    app.post('/product/register', registerProduct);    
}