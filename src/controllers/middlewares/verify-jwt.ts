import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpResponse from "@/utils/http-helper";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    }

    catch (error) {
        const httpResponse = await HttpResponse.Unauthorized();
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
}