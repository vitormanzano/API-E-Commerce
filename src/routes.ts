import { FastifyInstance } from "fastify";
import { verifyJWT } from "./controllers/middlewares/verify-jwt";

import { refresh } from "./controllers/persons/refresh/refresh";
import { profile } from "./controllers/persons/profile/profile";
import { registerPerson } from "./controllers/persons/register-person/register-person";
import { authenticatePerson } from "./controllers/persons/authenticate-person/authenticate-person";
import { deletePersonByGuid } from "./controllers/persons/delete-person/delete-person";
import { updatePerson } from "./controllers/persons/update-person/update-person";

import { registerProduct } from "./controllers/products/register-product/register-product";
import { updateProduct } from "./controllers/products/update-product/update-product";
import { getOwnProducts } from "./controllers/products/get-own-products/get-own-products";
import { findAllProducts } from "./controllers/products/find-all-products/find-all-products";
import { findProductsByName } from "./controllers/products/find-products-by-name/find-products-by-name";
import { findNearbySellers } from "./controllers/persons/find-nearby-sellers/find-nearby-sellers";
import { deleteProduct } from "./controllers/products/delete-product/delete-product";

export async function personRoutes(app: FastifyInstance) {
    app.post('/person/register', registerPerson);
    app.post('/sessions', authenticatePerson);

    app.delete('/person/delete', {onRequest: verifyJWT}, deletePersonByGuid);

    app.patch('/token/refresh', refresh);
    app.patch('/person/update', {onRequest: verifyJWT}, updatePerson);
    
    app.get('/me', {onRequest: verifyJWT}, profile)
    app.get('/person/nearbySellers', {onRequest: verifyJWT}, findNearbySellers)
}

export async function productRoutes(app: FastifyInstance) {
    app.post('/product/register', {onRequest: verifyJWT} ,registerProduct);   

    app.patch('/product/update', {onRequest: verifyJWT}, updateProduct); 

    app.get('/product/search/:page', {onRequest: verifyJWT} , getOwnProducts);
    app.get('/product/searchAll/:page', findAllProducts);
    app.get('/product/searchName/:name', findProductsByName);

    app.delete('/product/delete', {onRequest: verifyJWT}, deleteProduct)

}