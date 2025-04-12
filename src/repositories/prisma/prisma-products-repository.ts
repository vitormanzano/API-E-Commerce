import { Buy, Prisma, Product } from "@prisma/client";
import { IProductsRepository } from "../products-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaProductRepository implements IProductsRepository {
    async findAllProducts(page: number): Promise<Product[]> {
        const products = await prisma.product.findMany({
            orderBy: {
                name: 'asc'
            },
            take: 20,
            skip: (page - 1) * 20
        });

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

    async findProductByName(name: string): Promise<Product[]> {
        const products = await prisma.product.findMany({
            where: {
                name,
            }
        });
        return products;
    }

    async deleteProductByGuid(sellerGuid: string, productGuid: string): Promise<Product> {
        const product = await prisma.product.delete({
            where: {
                sellerId: sellerGuid,
                guid: productGuid
            }
        });

        return product;
    }

    async updateProductByGuid(productGuid: string, fieldToUpdate: string, valueToUpdate: any): Promise<Product | null> {
        const product = await prisma.product.update({
            where: {
                guid: productGuid
            },
            data: {
                [fieldToUpdate]: valueToUpdate
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

    async buyProduct(productGuid: string, buyerGuid: string, quantity: number): Promise<Buy> {
        const buyData = await prisma.buy.create({
            data: {
                personId: buyerGuid,
                productId: productGuid
            }
        })
        console.log(buyData);
        return buyData
    }
}