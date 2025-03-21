import { FastifyReply } from "fastify";
import * as HttpResponse from "@/utils/http-helper";

export async function createRefreshToken(personGuid: string, reply: FastifyReply) {
    try {
        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: personGuid,
                    expiresIn: '7d'
                }
            }
        );

        return refreshToken;
    } 
    catch (error) {
        const httpResponse = await HttpResponse.badRequest("Something weird happened here... ");
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}