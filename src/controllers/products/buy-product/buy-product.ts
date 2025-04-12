import { makeBuyProductService } from "@/factories/make-buy-product-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

export const buyProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const buyProductSchema =  z.object ({
        productGuid: z.string(),
        quantity: z.number().min(1, "Buy at least 1")
    }
)
    const {productGuid, quantity} = buyProductSchema.parse(request.body);
    const buyerGuid = request.user.sub;

    try {
        const buyProductService = makeBuyProductService();

        const productAfterBuy = await buyProductService.execute({productGuid, buyerGuid, quantity});
        console.log(productAfterBuy);
        const httpResponse = await HttpResponse.ok({
            message: "Congratulations!"
        })

        return reply.status(httpResponse.statusCode).send(httpResponse.body)
    } 
    catch (error) {
        const httpResponse = await HttpResponse.badRequest({
            message: error
        })

        return reply.status(httpResponse.statusCode).send(httpResponse.body)
    }
}