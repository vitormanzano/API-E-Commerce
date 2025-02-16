import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { Product } from "@prisma/client";

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
        const updatedProduct = await this.productsRepository.updateProductByGuid(guid, productData);

        if (!updatedProduct) {
            throw new ResourceNotFoundError();
        }

        return { updatedProduct };
    }


}