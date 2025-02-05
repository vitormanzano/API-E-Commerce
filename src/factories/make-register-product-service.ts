import { PrismaPersonRepository } from "../repositories/prisma/prisma-person-repository";
import { PrismaProductRepository } from "../repositories/prisma/prisma-products-repository";
import { RegisterProductService } from "../services/product/register/register-product-service";

export function makeRegisterProductService() {
    const productsRepsitory = new PrismaProductRepository();
    const personsRepository = new PrismaPersonRepository()
    const registerService = new RegisterProductService(productsRepsitory, personsRepository);

    return registerService;
}