import { Decimal } from "@prisma/client/runtime/library";

export interface IFormattedPerson {
    name: string,
    email: string,
    latitude: Decimal,
    longitude: Decimal
}