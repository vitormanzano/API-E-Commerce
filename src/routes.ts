import { FastifyInstance } from "fastify";
import { registerPerson } from "./controllers/persons/register-person/register-person";
import { registerProduct } from "./controllers/products/register-product";
import { authenticatePerson } from "./controllers/persons/authenticate-person/authenticate-person";
import { deletePersonByGuid } from "./controllers/persons/delete-person/delete-person";
import { refresh } from "./controllers/persons/refresh/refresh";
import { profile } from "./controllers/persons/profile/profile";
import { verifyJWT } from "./controllers/middlewares/verify-jwt";
import { updatePerson } from "./controllers/persons/update-person/update-person";
import { updateProduct } from "./controllers/products/update-product";
import { getOwnProducts } from "./controllers/products/get-own-products";
import { findAllProducts } from "./controllers/products/find-all-products";

export async function personRoutes(app: FastifyInstance) {
    app.post('/person/register', registerPerson);
    app.post('/sessions', authenticatePerson);

    app.delete('/person/delete', {onRequest: verifyJWT}, deletePersonByGuid);

    app.patch('/token/refresh', refresh);
    app.patch('/person/update', {onRequest: verifyJWT}, updatePerson);
    
    app.get('/me', {onRequest: verifyJWT}, profile)
}

export async function productRoutes(app: FastifyInstance) {
    app.post('/product/register', {onRequest: verifyJWT} ,registerProduct);   
    app.patch('/product/update', {onRequest: verifyJWT}, updateProduct); 
    app.get('/product/search/:page', {onRequest: verifyJWT} , getOwnProducts);

    app.get('/product/search', findAllProducts);
}