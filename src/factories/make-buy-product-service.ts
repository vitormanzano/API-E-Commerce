import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { BuyProductService } from "@/services/product/buy-product/buy-product-service";

export function makeBuyProductService() {
    const prismaRepository = new PrismaProductRepository();
    const buyProductService = new BuyProductService(prismaRepository);

    return buyProductService;
}