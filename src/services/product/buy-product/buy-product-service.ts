import { IProductsRepository } from "@/repositories/products-repository-interface";
import { verifyProductIsUndefinedOrVoid } from "@/utils/verifyProductIsVoidOrUndefined";
import { IBuyProductServiceRequest } from "./models/buy-product-service-request";
import { IBuyProductServiceResponse } from "./models/buy-product-service-response";
import { OutOfStockError } from "@/errors/out-of-stock-error";

export class BuyProductService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({productGuid, buyerGuid, quantity}: IBuyProductServiceRequest ): Promise<IBuyProductServiceResponse> {
        const product = await this.productsRepository.findProductByGuid(productGuid);

        verifyProductIsUndefinedOrVoid(product);
        
        const verifyProductQuantity = quantity > product!.quantity!;

        if (verifyProductQuantity) {
            throw new OutOfStockError();
        }
        
        const updatedProduct = await this.productsRepository.updateProductByGuid(productGuid, "quantity", quantity)

        await this.productsRepository.buyProduct(productGuid, buyerGuid ,quantity);
        
        return { updatedProduct } 
    }
}