import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { Product } from "@prisma/client";
import { verifyProductIsValid } from "../register/verifyProductIsValid";

interface IUpdateProductServiceRequest {
    name?: string,
    description?: string,
    price?: number,
    quantity?: number
    sellerId: string
}

interface IUpdateProductServiceResponse {
    updatedProduct: Product;
}

export class UpdateProductService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute(guid: string, productData: IUpdateProductServiceRequest): Promise<IUpdateProductServiceResponse> {
        if (productData.price != undefined) {
            if (productData.price <= 0) {
                throw new Error();
            }
        }

        if (productData.quantity != undefined) {
            if (productData.quantity <= 0) {
                throw new Error();
            }
        }

        const updatedProduct = await this.productsRepository.updateProductByGuid(guid, productData);

        if (!updatedProduct) {
            throw new ResourceNotFoundError();
        }

        return { updatedProduct };
    }


}