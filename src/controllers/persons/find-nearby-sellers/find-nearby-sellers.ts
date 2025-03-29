import { makeFindNearbySellersService } from "@/factories/make-find-nearby-sellers-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpResponse from "@/utils/http-helper";

export const findNearbySellers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const guid = request.user.sub;

        const findNearbySellersService = makeFindNearbySellersService();

        const { nearbySellers } = await findNearbySellersService.execute({
            personGuid: guid,
        })
 
        const httpResponse = await HttpResponse.ok({
            sellers: nearbySellers
        });

        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.notFound(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }  
}