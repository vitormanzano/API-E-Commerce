import { Prisma, Product } from "@prisma/client";

export interface IProductRepository {
    registerProduct(productData: Prisma.ProductUncheckedCreateInput): Promise<Product>
}