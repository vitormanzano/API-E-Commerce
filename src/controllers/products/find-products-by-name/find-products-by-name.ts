import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";
import { makeFindProductsByNameService } from "@/factories/make-find-products-by-name-service";

export const findProductsByName = async (request: FastifyRequest, reply: FastifyReply) => {
    const findProductByNameBodySchema = z.object({
        name: z.string().min(1, "Send a name with minimum 1 letter")
    });

    const findProductsByNameBody = findProductByNameBodySchema.parse(request.params);

    try {
        const findProductsByNameService = makeFindProductsByNameService();

        const products = await findProductsByNameService.execute(findProductsByNameBody);

        const httpResponse = await HttpResponse.ok(products);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}