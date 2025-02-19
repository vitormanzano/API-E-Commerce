import { Prisma, Product } from "@prisma/client";

export interface IProductsRepository {
    registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product>
    updateProductByGuid(guid: string, productData:Prisma.ProductUpdateInput): Promise<Product | null>
    findProductByGuid(guid: string): Promise<Product | null>
    findProductsByPerson(guid: string, page: number): Promise<Product[]>
    findAllProducts(): Promise<Product[]>
    findProductByName(name: string): Promise<Product[]>
}