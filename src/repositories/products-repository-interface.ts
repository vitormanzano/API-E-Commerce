import { Prisma, Product } from "@prisma/client";

export interface IProductsRepository {
    registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product>
}