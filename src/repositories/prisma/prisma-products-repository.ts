import { Prisma, Product } from "@prisma/client";
import { IProductsRepository } from "../products-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaProductRepository implements IProductsRepository {
    async findProductByGuid(guid: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: {
                guid
            }
        });

        return product;
    }

    async updateProductByGuid(guid: string, productData: Prisma.ProductUpdateInput): Promise<Product | null> {
        const product = await prisma.product.update({
            where: {
                guid
            },
            data: {
                description: productData.description,
                name: productData.name,
                price: productData.price,
                quantity: productData.quantity
            }
        });

        return product;
    }

    async registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product> {
         const product = await prisma.product.create({
                data: productData
            });
                
            return product;
    }
}