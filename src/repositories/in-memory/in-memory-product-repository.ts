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
            quantity: productData.quantity,
            sellerId: productData.sellerId
        } as Product
        
        this.productList.push(product);

        return product
    }  

    async findAllProducts(page: number): Promise<Product[]> {
        return this.productList.slice((page - 1) * 20, page * 20);
    }

    async findProductByGuid(guid: string): Promise<Product | null> {
        const product = this.productList.find(product => product.guid === guid);

        if (!product) {
            return null;
        }

        return product;
    }

    async findProductByName(name: string): Promise<Product[]> {
        const products = this.productList.filter(product => product.name === name);

        return products;
    }

    async deleteProductByGuid(sellerGuid: string, productGuid: string): Promise<Product | undefined> {
        const personProducts = this.productList.filter(product => product.sellerId === sellerGuid);
        
        const productIndex = personProducts.findIndex(product => product.guid === productGuid);

        this.productList.splice(productIndex, 1);

        const product = personProducts.find(product => product.guid === productGuid);

        return product;
    }

    async updateProductByGuid(productGuid: string, fieldToUpdate: string, valueToUpdate: any): Promise<Product | null> {
        const product = await this.findProductByGuid(productGuid);

        switch (fieldToUpdate) {
                   case 'name':
                       product!.name = valueToUpdate as string;
                       break;
                   case 'description':
                       product!.description = valueToUpdate as string;
                       break;
                   case 'price':
                       product!.price = valueToUpdate as number;
                       break;
                   case 'quantity':
                       product!.quantity = valueToUpdate as number;
               }

        return product;
    }


    async findProductsByPerson(guid: string, page: number) {
        const products = this.productList.filter(product => product.sellerId === guid).
        slice( (page - 1) * 20, page * 20);
        
        return products;
    }
}