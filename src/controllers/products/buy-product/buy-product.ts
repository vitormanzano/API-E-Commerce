import { makeBuyProductService } from "@/factories/make-buy-product-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

export const buyProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const buyProductSchema =  z.object ({
        guid: z.string(),
        quantity: z.number().min(1, "Buy at least 1")
    }
)
    const {guid, quantity} = buyProductSchema.parse(request.body);

    try {
        const buyProductService = makeBuyProductService();

        const productAfterBuy = await buyProductService.execute(guid, quantity);

        const httpResponse = await HttpResponse.ok({
            message: "Congratulations!"
        })

        return reply.status(httpResponse.statusCode).send(httpResponse.body)
    } 
    catch (error) {
        const httpResponse = await HttpResponse.badRequest({
            message: "Something is wrong..."
        })

        return reply.status(httpResponse.statusCode).send(httpResponse.body)
    }
}