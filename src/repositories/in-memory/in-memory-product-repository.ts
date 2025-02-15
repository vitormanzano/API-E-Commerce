import { Prisma, Product } from "@prisma/client";
import { IProductsRepository } from "../products-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryProductRepository implements IProductsRepository {
    private productList: Product[] = [];

    async registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product> {
        const product = {
            guid: randomUUID(),
            name: productData.name,
            createdAt: productData.createdAt,
            description: productData.description,
            price: productData.price,
            quantity: productData.quantity
        } as Product
        
        this.productList.push(product);

        return product
    }  
}