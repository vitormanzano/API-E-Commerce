import { Product } from "@prisma/client";

export interface IFindNearbyProductsServiceResponse {
    nearbyProducts: Product[]
}