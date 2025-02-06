import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import { makeAuthenticatePersonService } from "../../../factories/make-authenticate-person-service";
import * as HttpResponse from "../../../utils/http-helper";

export const authenticatePerson = async (request: FastifyRequest, reply: FastifyReply) => {
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string()
    });

    const authenticatePersonBody = authenticateBodySchema.parse(request.body);

    try {
        const authenticatePersonService = makeAuthenticatePersonService();

        const personGuid = await authenticatePersonService.execute(authenticatePersonBody);

        const httpResponse = await HttpResponse.ok(personGuid);

        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }

    catch (error) {
        const httpResponse = await HttpResponse.noContent(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
} 