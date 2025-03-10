import { findGetOwnProductsService } from "@/factories/make-get-own-products-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

export const findOwnProducts = async (request: FastifyRequest, reply: FastifyReply) => {
    const findOwnProductsSchema = z.object ({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = findOwnProductsSchema.parse(request.params); 

    try {
        const personGuid = request.user.sub;
        const findOwnProductsService = findGetOwnProductsService();

        const products = await findOwnProductsService.execute({
            personGuid,
            page
        });

        const httpResponse = await HttpResponse.ok(products);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    } 
    catch (error) {
        const httpResponse = await HttpResponse.badRequest({ message: "Erro" });
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}