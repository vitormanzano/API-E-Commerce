import { FastifyReply, FastifyRequest } from "fastify"
import * as z from "zod";
import { makeDeletePersonService } from "@/factories/make-delete-person-service";
import * as HttpResponse from "@/utils/http-helper";


export const deletePersonByGuid = async (request: FastifyRequest, reply: FastifyReply) => {
    
    try {
        const deletePersonService = makeDeletePersonService();

        const guid = request.user.sub;
        const { person } = await deletePersonService.execute({guid});

        const httpResponse = await HttpResponse.ok({
            person: {
                ...person,
                guid: undefined,
                password: undefined
            }
        });

        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch(error) {
        const httpResponse = await HttpResponse.notFound(error);
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}