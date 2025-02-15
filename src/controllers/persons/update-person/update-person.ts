import { makeUpdatePersonService } from "@/factories/make-update-person-service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import * as HttpResponse from "@/utils/http-helper";

export const updatePerson = async (request: FastifyRequest, reply: FastifyReply) => {
    const updateBodySchema = z.object({
        name: z.optional(z.string()),
        email: z.optional(z.string().email("Digit a valid email!")),
        password: z.optional(z.string()),
        latitude: z.optional(z.number().min(-90).max(90)),
        longitude: z.optional(z.number().min(-180).max(180))
    });

    const updatePersonBody = updateBodySchema.parse(request.body);

    try {
        const updatePersonService = makeUpdatePersonService();

        const guid = request.user.sub;

        const { updatedPerson }  = await updatePersonService.execute(guid, updatePersonBody);
        
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