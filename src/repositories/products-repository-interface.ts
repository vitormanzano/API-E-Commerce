import { Prisma, Product } from "@prisma/client";

export interface IProductsRepository {
    registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product>
    updateProductByGuid(productGuid: string, fieldToUpdate: string, valueToUpdate: string): Promise<Product | null>
    findProductByGuid(guid: string): Promise<Product | null>
    findProductsByPerson(guid: string, page: number): Promise<Product[]>
    findAllProducts(page: number): Promise<Product[]>
    findProductByName(name: string): Promise<Product[]>
    deleteProductByGuid(personGuid: string, productGuid: string): Promise<Product | undefined>
    buyProduct(quantity: number, product: Product): Promise<Product>
}