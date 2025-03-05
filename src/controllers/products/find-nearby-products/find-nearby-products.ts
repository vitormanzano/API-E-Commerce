import { makeFindNearbyProductsService } from "@/factories/make-find-nearby-products-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpResponse from "@/utils/http-helper";

export const findNearbyProducts = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const guid = request.user.sub;

        const findNearbyProductsService = makeFindNearbyProductsService();

        const { nearbyProducts } = await findNearbyProductsService.execute(guid);

        const nearbyProductsResponse = nearbyProducts.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity
        }));
        const httpResponse = await HttpResponse.ok(nearbyProductsResponse);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);

    } 
    catch (error) {
        const httpResponse = await HttpResponse.badRequest("Bad");
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}