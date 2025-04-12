import { Buy, Prisma, Product } from "@prisma/client";

export interface IProductsRepository {
    registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product>
    updateProductByGuid(productGuid: string, fieldToUpdate: string, valueToUpdate: any): Promise<Product | null>
    findProductByGuid(guid: string): Promise<Product | null>
    findProductsByPerson(guid: string, page: number): Promise<Product[]>
    findAllProducts(page: number): Promise<Product[]>
    findProductByName(name: string): Promise<Product[]>
    deleteProductByGuid(personGuid: string, productGuid: string): Promise<Product | undefined>
    buyProduct(productGuid: string, buyerGuid: string ,quantity: number): Promise<Buy>
}