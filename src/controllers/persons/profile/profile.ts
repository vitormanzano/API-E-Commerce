import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetPersonProfileService } from "../../../factories/make-get-person-profile-service";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
   const getPersonProfile = makeGetPersonProfileService();

    const { person } = await getPersonProfile.execute(request.user.sub);

    return reply.status(200).send({
        person: {
            ...person,
            password: undefined
        }
    });

}   