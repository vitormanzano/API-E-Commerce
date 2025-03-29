import { makeUpdatePersonService } from "@/factories/make-update-person-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";
import { formatPersonResponse } from "@/controllers/formatPersonResponse";
import { format } from "path";

export const updatePerson = async (request: FastifyRequest, reply: FastifyReply) => {
    const updateBodySchema = z.object({
        fieldToUpdate: z.string(),
        valueToUpdate: z.string(),
    });

    const {fieldToUpdate, valueToUpdate} = updateBodySchema.parse(request.body);

    try {

        const updatePersonService = makeUpdatePersonService();

        const personGuid = request.user.sub;

        const { updatedPerson }  = await updatePersonService.execute({personGuid, fieldToUpdate,valueToUpdate});

        const formatPerson = formatPersonResponse(updatedPerson);
        
        const httpResponse = await HttpResponse.ok(formatPerson);
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}