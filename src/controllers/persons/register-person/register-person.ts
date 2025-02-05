import { FastifyReply, FastifyRequest } from "fastify"
import * as z from "zod";
import { makeRegisterPersonService } from "../../../factories/make-register-person-service";
import { IRegisterPersonServiceRequest} from "../../../services/person/register/register-person-service";

export const registerPerson = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string().min(1, "Name is mandatory"),
        email: z.string().email("Digit a valid email!"),
        password: z.string(),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180)
    });
    
    const registerPersonBody = registerBodySchema.parse(request.body);

    try {
        const registerPersonService = makeRegisterPersonService();

        const { person } = await registerPersonService.execute(registerPersonBody);

        return reply.status(201).send({
            person: {
                ...person,
                password: undefined
            }
        });
    }

    catch (error) {
       console.log(error);
       return reply.status(400).send(error); 
    }

    
} 