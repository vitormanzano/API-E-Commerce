import { PrismaPersonRepository } from "@/repositories/prisma/prisma-person-repository";
import { DeletePersonByGuidService } from "@/services/person/delete/delete-person-service";

export function makeDeletePersonService() {
    const personsRepository = new PrismaPersonRepository();
    const deletePersonService = new DeletePersonByGuidService(personsRepository);

    return deletePersonService;
}