import { Prisma, Product } from "@prisma/client";
import { IProductsRepository } from "../products-repository-interface";
import { prisma } from "@/lib/prisma";


export class PrismaProductRepository implements IProductsRepository {
    async registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product> {
         const product = await prisma.product.create({
                    data: productData
            });
                
            return product;
    }
}