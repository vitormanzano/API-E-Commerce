import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { Product } from "@prisma/client";
import { verifyProductIsValid } from "../register/verifyProductIsValid";

interface IUpdateProductServiceRequest {
    productGuid: string,
    fieldToUpdate: string,
    valueToUpdate: any,
}

interface IUpdateProductServiceResponse {
    updatedProduct: Product;
}

export class UpdateProductService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({productGuid, fieldToUpdate, valueToUpdate}: IUpdateProductServiceRequest): Promise<IUpdateProductServiceResponse> {
        const updatedProduct = await this.productsRepository.updateProductByGuid(productGuid, fieldToUpdate, valueToUpdate);

        if (!updatedProduct) {
            throw new ResourceNotFoundError();
        }

        await verifyProductIsValid(updatedProduct);

        return { updatedProduct };
    }


}