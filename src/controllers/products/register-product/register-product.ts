import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import { makeRegisterProductService } from "@/factories/make-register-product-service";
import * as HttpResponse from "@/utils/http-helper";

export const registerProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string().min(5, "Name should've more than 5 characters"),
        description: z.string().min(15, "Description should've more than 15 characters"),
        price: z.number().min(0.1, "Price should've more than 0"),
        quantity: z.number().min(1, "Quantity should've more than 0"),
        sellerId: z.string().default(request.user.sub)
    });

    const registerProductBody = registerBodySchema.parse(request.body); //Make a function to create this schema and body
    
    try {
        const registerProduct = makeRegisterProductService();

        const { product } = await registerProduct.execute(registerProductBody);

        const httpResponse = await HttpResponse.created({
                ...product,
                sellerId: undefined,
                guid: undefined,
        });
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}