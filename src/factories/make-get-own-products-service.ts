import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { GetOwnProductsService } from "@/services/product/get-own-products/get-own-products-service";

export function makeGetOwnProductsService() {
    const prismaRepository = new PrismaProductRepository();
    const getOwnProductsService = new GetOwnProductsService(prismaRepository);

    return getOwnProductsService;
}