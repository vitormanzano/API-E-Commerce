import { FastifyReply, FastifyRequest } from "fastify"
import * as z from "zod";
import { makeDeletePersonService } from "@/factories/make-delete-person-service";
import * as HttpResponse from "@/utils/http-helper";


export const deletePersonByGuid = async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteBodySchema = z.object({
        guid: z.string()
    });

    const deletePersonBody = deleteBodySchema.parse(request.params);

    try {
        const deletePersonService = makeDeletePersonService();

        const  { person } = await deletePersonService.execute(deletePersonBody);

        const httpResponse = await HttpResponse.ok({
            person: {
                person,
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