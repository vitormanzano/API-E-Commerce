export class Product {
    private name: string = '';
    private description: string = '';
    private price: number = 0;
    private quantity: number = 0;
    private sellerId: string = '';

    constructor (name: string,
                description: string,
                price: number,
                quantity: number,
                sellerId: string

    ) {
        this.setName(name);
        this.setDescription(description);
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setSellerId(sellerId);
        this.validateProduct();
    }

    private setName(name: string): void {
        this.name = name;
    }

    private setDescription(description: string): void {
        this.description = description;
    }

    private setPrice(price: number): void {
        this.price = price;
    }

    private setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    private setSellerId(sellerId: string): void {
        this.sellerId = sellerId;
    }

    private validateProduct() {
        if (this.price < 0) {
            throw new Error();
        }

        if (this.quantity < 1) {
            throw new Error();
        }

        if (this.name.length < 5) {
            throw new Error();
        }

        if (this.description.length < 15) {
            throw new Error();
        } 
    }
}