import { makeUpdateProductService } from "@/factories/make-update-product-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

export const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const updateBodySchema = z.object({
        productGuid: z.string(),
        name: z.optional(z.string()),
        description: z.optional(z.string()),
        price: z.optional(z.number()),
        quantity: z.optional(z.number()),
        sellerId: z.string().default(request.user.sub)
    });

    const updateProductBody = updateBodySchema.parse(request.body);

    try {
        const updateProductService = makeUpdateProductService();

        const product  = await updateProductService.execute(updateProductBody.productGuid, updateProductBody);

        const httpResponse = await HttpResponse.ok({
            ...product,
            sellerId: undefined
        });
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    } 
    catch (error) {
        return reply.status(401).send({ message: "Erro" })
    }
}