import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { UpdateProductService } from "@/services/product/update/update-product-service";

export function makeUpdateProductService() {
    const prismaRepository = new PrismaProductRepository();
    const updateProductService = new UpdateProductService(prismaRepository);

    return updateProductService;
}