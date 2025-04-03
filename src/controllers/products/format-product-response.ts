import { IFormattedProduct } from "@/models/formatted-product";
import { Product } from "@prisma/client";

export async function formatProductResponse(product: Product): Promise<IFormattedProduct> {
    const formattedProduct = {
        ...product,
        guid: undefined,
        sellerId: undefined
    }

    return formattedProduct
}