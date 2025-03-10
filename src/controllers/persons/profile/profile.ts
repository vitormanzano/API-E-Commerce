import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetPersonProfileService } from "@/factories/make-get-person-profile-service";
import * as HttpResponse from "@/utils/http-helper";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
   try {
        const getPersonProfile = makeGetPersonProfileService();

        const guid = request.user.sub;

        const { person } = await getPersonProfile.execute({ guid });

        const httpResponse = await HttpResponse.ok({
            ...person,
            guid: undefined,
            password: undefined
        });

    return reply.status(httpResponse.statusCode).send(httpResponse.body);
   } 
   catch (error) {
        const httpResponse = await HttpResponse.badRequest(error);
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
   }

}   