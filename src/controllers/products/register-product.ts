import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import { makeRegisterProductService } from "@/factories/make-register-product-service";
import * as HttpResponse from "@/utils/http-helper";

export const registerProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string().min(1, "Name is mandatory"),
        description: z.string(),
        price: z.number(),
        quantity: z.number(),
        sellerId: z.string()
    });

    const registerProductBody = registerBodySchema.parse(request.body); //Make a function to create this schema and body

    try {
        const registerProduct = makeRegisterProductService();

        const product = await registerProduct.execute(registerProductBody);

        const httpResponse = await HttpResponse.created(product);
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}