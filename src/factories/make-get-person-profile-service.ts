import { PrismaPersonRepository } from "@/repositories/prisma/prisma-person-repository";
import { GetProfileService } from "@/services/person/get-profile/get-profile-service";

export function makeGetPersonProfileService() {
    const personsRepository = new PrismaPersonRepository();
    const getPersonProfile = new GetProfileService(personsRepository);

    return getPersonProfile;
}