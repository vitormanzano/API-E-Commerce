import { Product } from "@prisma/client";

export interface IFindAllProductsServiceResponse {
    allProducts: Product[];
}