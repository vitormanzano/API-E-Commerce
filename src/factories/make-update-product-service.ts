import { prisma } from "@/lib/prisma";
import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { UpdateProductService } from "@/services/product/update/update-product-service";

export async function makeUpdateProductService() {
    const prismaRepository = new PrismaProductRepository();
    const updateProductService = new UpdateProductService(prismaRepository);

    return updateProductService;
}