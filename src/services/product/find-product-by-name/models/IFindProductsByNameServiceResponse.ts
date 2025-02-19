import { Product } from "@prisma/client";

export interface IFindProductsByNameServiceResponse {
    products: Product[];
}