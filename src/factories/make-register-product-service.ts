import { PrismaProductRepository } from "@/repositories/prisma/prisma-products-repository";
import { RegisterProductService } from "@/services/product/register/register-product-service";

export function makeRegisterProductService() {
    const productsRepsitory = new PrismaProductRepository();
    const registerService = new RegisterProductService(productsRepsitory);

    return registerService;
}