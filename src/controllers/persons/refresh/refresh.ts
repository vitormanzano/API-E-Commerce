import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpResponse from "@/utils/http-helper";
import { createToken } from "@/controllers/middlewares/createToken";
import { createRefreshToken } from "@/controllers/middlewares/createRefreshToken";

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify({ onlyCookie: true });

    try {
        const person = request.user.sub;

        const token = await createToken(person, reply);

        const refreshToken = await createRefreshToken(person, reply);

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