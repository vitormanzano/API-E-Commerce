import { PrismaPersonRepository } from "@/repositories/prisma/prisma-person-repository";
import { UpdatePersonService } from "@/services/person/update/update-person-service";

export function makeUpdatePersonService() {
    const personsRepository = new PrismaPersonRepository();
    const updatePersonService = new UpdatePersonService(personsRepository);

    return updatePersonService;
}