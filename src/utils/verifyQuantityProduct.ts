export async function verifyQuantityProduct(quantity: number): Promise<Boolean> {
    if (quantity <= 0 ) {
        return false;
    }
    return true;
}