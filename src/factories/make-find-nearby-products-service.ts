import { PrismaPersonRepository } from "@/repositories/prisma/prisma-person-repository";
import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { FindNearbyProductsService } from "@/services/product/find-nearby-products/find-nearby-products-service";

export function makeFindNearbyProductsService() {
    const prismaProductsRepository = new PrismaProductRepository();
    const prismaPersonsRepository = new PrismaPersonRepository();

    const findNearbyProductsService = new FindNearbyProductsService(prismaPersonsRepository, prismaProductsRepository)

    return findNearbyProductsService;
}