import { FastifyReply, FastifyRequest } from "fastify"
import * as z from "zod";
import { makeRegisterService } from "../../../factories/make-register-user-service";
import { IRegisterUserServiceRequest} from "../../../services/user/register/register-user-service";

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string().min(1, "Name is mandatory"),
        email: z.string().email("Digit a valid email!"),
        password: z.string().min(6, "Password should be have last 6 characters"),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180)
    });
    
    const registerUserBody = registerBodySchema.parse(request.body) as IRegisterUserServiceRequest;

    try {
        const registerUserService = makeRegisterService();

        await registerUserService.execute(registerUserBody);
    }

    catch (error) {
       console.log(error); 
    }

    return reply.status(201).send({ message: "Usuário criado!" });
} 