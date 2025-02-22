import { Product } from "@prisma/client";

export interface IDeleteProductByGuidServiceResponse {
    deletedProduct: Product
}