import { Person } from "@prisma/client";

export interface IFindNearbySellersServiceResponse {
    nearbySellers: Person[]
}