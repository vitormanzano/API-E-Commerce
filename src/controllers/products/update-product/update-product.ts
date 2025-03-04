import { makeUpdateProductService } from "@/factories/make-update-product-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

export const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const updateProductBodySchema = z.object({
        productGuid: z.string(),
        fieldToUpdate: z.string(),
        valueToUpdate: z.string(),
    });

    const {productGuid, fieldToUpdate, valueToUpdate} = updateProductBodySchema.parse(request.body);

    try {
        const updateProductService = makeUpdateProductService();

        const product  = await updateProductService.execute({productGuid, fieldToUpdate, valueToUpdate});

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