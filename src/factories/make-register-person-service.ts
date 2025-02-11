import { PrismaPersonRepository } from "@/repositories/prisma/prisma-person-repository";
import { RegisterPersonService } from "@/services/person/register/register-person-service";

export function makeRegisterPersonService() {
    const personsRepository = new PrismaPersonRepository();
    const registerService = new RegisterPersonService(personsRepository);

    return registerService;
}