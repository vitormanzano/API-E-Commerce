import { PrismaPersonRepository } from "@/repositories/prisma/prisma-person-repository";
import { FindNearbySellersService } from "@/services/person/find-nearby-sellers/find-nearby-sellers-service";

export function makeFindNearbySellersService() {
    const prismaRepository = new PrismaPersonRepository();
    const findNearbySellersService = new FindNearbySellersService(prismaRepository);

    return findNearbySellersService;
}