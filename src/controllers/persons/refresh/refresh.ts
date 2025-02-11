import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpResponse from "@/utils/http-helper";

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify({ onlyCookie: true });

    try {
        const person = request.user.sub;

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: person
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: person,
                    expiresIn: '7d'
                }
            }
        )

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