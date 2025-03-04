import { makeUpdatePersonService } from "@/factories/make-update-person-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

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
        
        const httpResponse = await HttpResponse.ok({
            ...updatedPerson,
            password: undefined,
            guid: undefined,
        });
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest({ message: "Not should be able to update a person"});
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}