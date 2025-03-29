import { makeDeleteProductService } from "@/factories/make-delete-product-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

export const deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteProductBodySchema = z.object({
        productGuid: z.string()
    });

    const { productGuid } = deleteProductBodySchema.parse(request.body);

    try {
        const personGuid = request.user.sub;

        const deleteProductService = makeDeleteProductService();

        const { deletedProduct } = await deleteProductService.execute({
            personGuid,
            productGuid
        });

        const httpResponse = await HttpResponse.ok({
            ...deletedProduct,
            sellerId: undefined
        });

        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }

    catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}