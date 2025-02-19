import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { FindProductsByNameService } from "@/services/product/find-product-by-name/find-products-by-name-service";

export function makeFindProductsByNameService() {
    const prismaRepository = new PrismaProductRepository();
    const findProductsByNameService = new FindProductsByNameService(prismaRepository);

    return findProductsByNameService;
}