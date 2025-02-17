import { Product } from "@prisma/client";

export interface IGetOwnProductsServiceResponse {
    products: Product[];
}