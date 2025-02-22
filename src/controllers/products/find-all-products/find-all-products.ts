import { makeFindAllProductsService } from "@/factories/make-find-all-products-service";
import * as HttpResponse from "@/utils/http-helper";
import { FastifyReply, FastifyRequest } from "fastify";

export const findAllProducts = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const findAllProductsService = makeFindAllProductsService();

        const { allProducts } = await findAllProductsService.execute();

        const httpResponse = await HttpResponse.ok(allProducts);

        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}