import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { FindAllProductsService } from "@/services/product/find-all-products/find-all-products-service";

export function makeFindAllProductsService() {
    const prismaRepository = new PrismaProductRepository();
    const findAllProductsService = new FindAllProductsService(prismaRepository);

    return findAllProductsService;
}