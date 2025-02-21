import { makeFindNearbySellersService } from "@/factories/make-find-nearby-sellers-service";
import { makeGetPersonProfileService } from "@/factories/make-get-person-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpResponse from "@/utils/http-helper";

export const findNearbySellers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const guid = request.user.sub;

        const getPersonProfileService = makeGetPersonProfileService();

        const { person } = await getPersonProfileService.execute({guid});

        const findNearbySellersService = makeFindNearbySellersService();

        const nearbySellers = await findNearbySellersService.execute(Number(person.latitude), Number(person.longitude))

        const sellersResponse = nearbySellers.map(seller => ({
            name: seller.name,
            email: seller.email
        }));
        
        const httpResponse = await HttpResponse.ok({
            sellers: sellersResponse
        });

        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.notFound(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }  
}