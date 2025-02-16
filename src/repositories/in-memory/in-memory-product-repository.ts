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

    async findProductByGuid(guid: string): Promise<Product | null> {
        const product = this.productList.find(product => product.guid === guid);

        if (!product) {
            return null;
        }

        return product;
    }

    async updateProductByGuid(guid: string, productData: Prisma.ProductUncheckedCreateInput): Promise<Product | null> {
        const product = await this.findProductByGuid(guid);

        product!.name = productData.name;
        product!.description = productData.description;
        product!.price = productData.price;
        product!.quantity = productData.quantity;

        return product;
    }


}