import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetPersonProfileService } from "@/factories/make-get-person-profile-service";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
   const getPersonProfile = makeGetPersonProfileService();

   const guid = request.user.sub;

    const { person } = await getPersonProfile.execute({ guid });

    return reply.status(200).send({
        person: {
            ...person,
            guid: undefined,
            password: undefined
        }
    });

}   