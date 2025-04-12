import { Product } from "@prisma/client";

export interface IBuyProductServiceResponse {
    updatedProduct: Product | null
}