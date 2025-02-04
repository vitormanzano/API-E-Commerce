export interface ProductModel {
    guid: string,
    name: string,
    createdAt: Date,
    description: string,
    price: number,
    quantity: number //TODO - Verificate if quantity is fewer than 1 same thing for price
}