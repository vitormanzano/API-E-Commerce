import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import { makeAuthenticatePersonService } from "@/factories/make-authenticate-person-service";
import * as HttpResponse from "@/utils/http-helper";
import { createToken } from "@/controllers/middlewares/createToken";
import { createRefreshToken } from "@/controllers/middlewares/createRefreshToken";

export const authenticatePerson = async (request: FastifyRequest, reply: FastifyReply) => {
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string()
    });

    const authenticatePersonBody = authenticateBodySchema.parse(request.body);

    try {
        const authenticatePersonService = makeAuthenticatePersonService();

        const { person } = await authenticatePersonService.execute(authenticatePersonBody);

        const token = await createToken(person.guid, reply);

        const refreshToken = await createRefreshToken(person.guid, reply);

        const httpResponse = await HttpResponse.ok(token);

        return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        })
        .status(httpResponse.statusCode).send(httpResponse.body);
    }

    catch (error) {
        const httpResponse = await HttpResponse.noContent(error);
        
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
} 