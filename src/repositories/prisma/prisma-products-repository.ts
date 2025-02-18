import { Prisma, Product } from "@prisma/client";
import { IProductsRepository } from "../products-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaProductRepository implements IProductsRepository {
    async findAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany({})

        return products;
    }

    async findProductByGuid(guid: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: {
                guid
            }
        });

        return product;
    }

    async findProductsByPerson(guid: string, page: number): Promise<Product[]> {
        const products = prisma.product.findMany({
            where: {
                sellerId: {
                    contains: guid
                } 
            },
            take: 20,
            skip: (page - 1) * 20
        });

        return products;
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