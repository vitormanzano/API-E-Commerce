import { FastifyReply, FastifyRequest } from "fastify"
import * as z from "zod";
import { makeRegisterPersonService } from "@/factories/make-register-person-service";
import * as HttpResponse from "@/utils/http-helper";


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

        const httpResponse = await HttpResponse.created({
            person: {
                ...person,
                password: undefined
            }
        })
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }

    catch (error) {

        const httpResponse = await HttpResponse.badRequest(error);
        
       return reply.status(httpResponse.statusCode).send(httpResponse.body); 
    }
} 