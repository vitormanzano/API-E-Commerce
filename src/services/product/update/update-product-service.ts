import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { verifyProductIsValid } from "../register/verifyProductIsValid";
import { IUpdateProductServiceRequest } from "./models/IUpdateProductServiceRequest";
import { IUpdateProductServiceResponse } from "./models/IUpdateProductServiceResponse";

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