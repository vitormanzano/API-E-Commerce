export async function verifyPriceProduct(price: number): Promise<Boolean> {
    if (price <= 0 ) {
        return false;
    }
    return true;
}