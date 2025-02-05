import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import { IAuthenticatePersonModel } from "../../../models/authenticate-person-model";
import { makeAuthenticatePersonService } from "../../../factories/make-authenticate-person-service";

export const authenticatePerson = async (request: FastifyRequest, reply: FastifyReply) => {
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string()
    });

    const authenticatePersonBody = authenticateBodySchema.parse(request.body) as IAuthenticatePersonModel;

    try {
        const authenticatePersonService = makeAuthenticatePersonService();

        const personGuid = await authenticatePersonService.execute(authenticatePersonBody);

        return reply.status(200).send(personGuid);

    }

    catch (error) {
        console.log(error);
        return reply.status(400).send({ message: 'Bad request' });
    }
} 