import { PrismaPersonRepository } from "../repositories/prisma/prisma-person-repository";
import { AuthenticatePersonService } from "../services/person/authenticate/authenticate-service";

export function makeAuthenticatePersonService() {
    const personsRepository = new PrismaPersonRepository();
    const authenticatePerson = new AuthenticatePersonService(personsRepository);

    return authenticatePerson;
}