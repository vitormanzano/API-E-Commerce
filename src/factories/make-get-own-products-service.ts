import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { FindOwnProductsService } from "@/services/product/get-own-products/find-own-products-service";

export function findGetOwnProductsService() {
    const prismaRepository = new PrismaProductRepository();
    const findOwnProductsService = new FindOwnProductsService(prismaRepository);

    return findOwnProductsService;
}