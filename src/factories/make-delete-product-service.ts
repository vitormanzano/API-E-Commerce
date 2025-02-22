import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { DeleteProductByGuidService } from "@/services/product/delete/delete-product-by-guid-service";

export function makeDeleteProductService() {
    const prismaRepository = new PrismaProductRepository();
    const deleteProductService = new DeleteProductByGuidService(prismaRepository)

    return deleteProductService;
}