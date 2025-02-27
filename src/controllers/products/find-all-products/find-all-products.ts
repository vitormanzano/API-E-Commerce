import { makeFindAllProductsService } from "@/factories/make-find-all-products-service";
import * as HttpResponse from "@/utils/http-helper";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";

export const findAllProducts = async (request: FastifyRequest, reply: FastifyReply) => {
    const getAllProductsSchema = z.object ({
            page: z.coerce.number().min(1).default(1),
        });
    
        const { page } = getAllProductsSchema.parse(request.params);
    try {
        const findAllProductsService = makeFindAllProductsService();

        const { allProducts } = await findAllProductsService.execute(page);

        const httpResponse = await HttpResponse.ok(allProducts);

        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}