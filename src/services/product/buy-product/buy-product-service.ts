import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { verifyProductIsUndefinedOrVoid } from "@/utils/verifyProductIsVoidOrUndefined";

export class BuyProductService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute(productGuid: string, quantity: number) {
        const product = await this.productsRepository.findProductByGuid(productGuid);

        verifyProductIsUndefinedOrVoid(product);

        const verifyProductQuantity = quantity > product!.quantity!;

        if (verifyProductQuantity) {
            throw new InvalidCredentialsError();
        }

        const productAfterBuy = await this.productsRepository.buyProduct(quantity, product!);

        return { productAfterBuy }
    }
}