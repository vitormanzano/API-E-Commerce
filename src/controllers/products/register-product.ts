import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import { IRegisterProductServiceRequest } from "../../services/product/register/register-product-service";
import { makeRegisterProductService } from "../../factories/make-register-product-service";

export const registerProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string().min(1, "Name is mandatory"),
        description: z.string(),
        price: z.number(),
        quantity: z.number(),
        sellerId: z.string()
    });

    const registerProductBody = registerBodySchema.parse(request.body);

    try {
        const registerProduct = makeRegisterProductService();

        await registerProduct.execute(registerProductBody);
    }
    catch (error) {
        console.log(error);
    }

    reply.status(201).send(registerProductBody);
}