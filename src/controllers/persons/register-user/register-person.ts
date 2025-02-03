import { FastifyReply, FastifyRequest } from "fastify"
import * as z from "zod";
import { makeRegisterService } from "../../../factories/make-register-person-service";
import { IRegisterPersonServiceRequest} from "../../../services/person/register/register-person-service";

export const registerPerson = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string().min(1, "Name is mandatory"),
        email: z.string().email("Digit a valid email!"),
        password: z.string().min(6, "Password should be have last 6 characters"),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180)
    });
    
    const registerPersonBody = registerBodySchema.parse(request.body) as IRegisterPersonServiceRequest;

    try {
        const registerPersonService = makeRegisterService();

        await registerPersonService.execute(registerPersonBody);
    }

    catch (error) {
       console.log(error); 
    }

    return reply.status(201).send({ message: "Usuário criado!" });
} 