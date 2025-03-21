import { FastifyReply } from "fastify";
import * as HttpResponse from "@/utils/http-helper";

export async function createToken(personGuid: string, reply: FastifyReply) {
    try {
        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: personGuid
                }
            }
        )

        return token;
    }
    catch (error) {
        const httpResponse = await HttpResponse.badRequest("Something weird happened here... ");
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}