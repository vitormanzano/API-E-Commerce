import { FastifyReply, FastifyRequest } from "fastify"
import * as z from "zod";
import { makeDeletePersonService } from "../../../factories/make-delete-person-service";

export const deletePersonByGuid = async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteBodySchema = z.object({
        guid: z.string()
    });

    const deletePersonBody = deleteBodySchema.parse(request.params);

    try {
        const deletePersonService = makeDeletePersonService();

        const  { person } = await deletePersonService.execute(deletePersonBody);

        return reply.status(200).send({
            person: {
                ...person,
                password: undefined,
            }
        });
    }
    catch(error) {
        return reply.status(400).send(error);
    }
}