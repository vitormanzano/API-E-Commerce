import { Person } from "@prisma/client";

export async function fixingSellersResponse(nearbySellers: Person[]) {
    const sellersResponse = nearbySellers.map(seller => ({
        name: seller.name,
        email: seller.email
    }));

    return sellersResponse;
}