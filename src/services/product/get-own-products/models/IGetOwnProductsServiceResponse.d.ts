import { Product } from "@prisma/client";

export interface IFindOwnProductsServiceResponse {
    products: Product[];
}