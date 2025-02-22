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

    async findAllProducts(): Promise<Product[]> {
        return this.productList;
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

        this.productList.slice(productIndex, 1);

        const product = personProducts.find(product => product.guid === productGuid);

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


    async findProductsByPerson(guid: string, page: number) {
        const products = this.productList.filter(product => product.sellerId === guid)
        .slice((page - 1 ) * 20, page * 20);
        
        return products;
    }
}