import { IProductsRepository } from "@/repositories/products-repository-interface";

interface IUpdateProductRequest {
    name?: string,
    description?: string,
    price?: number,
    quantity?: number
    sellerId: string
}

export class UpdateProductService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute(guid: string, productData: IUpdateProductRequest) {
        const updatedProduct = await this.productsRepository.updateProductByGuid(guid, productData);

        return updatedProduct;
    }


}