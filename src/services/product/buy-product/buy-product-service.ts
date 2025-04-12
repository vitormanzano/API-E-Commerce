import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { verifyProductIsUndefinedOrVoid } from "@/utils/verifyProductIsVoidOrUndefined";
import { IBuyProductServiceResponse } from "./models/buy-product-service-request";

export class BuyProductService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({productGuid, buyerGuid, quantity}: IBuyProductServiceResponse ) {
        const product = await this.productsRepository.findProductByGuid(productGuid);

        verifyProductIsUndefinedOrVoid(product);
        
        const verifyProductQuantity = quantity > product!.quantity!;

        if (verifyProductQuantity) {
            throw new InvalidCredentialsError();
        }
        
        const updateProduct = await this.productsRepository.updateProductByGuid(productGuid, "quantity", quantity)

        await this.productsRepository.buyProduct(productGuid, buyerGuid ,quantity);
        
        return { updateProduct }
    }
}