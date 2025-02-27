import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { IFindAllProductsServiceResponse } from "./models/IFindAllProductsServiceRespose";

export class FindAllProductsService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute(page: number): Promise<IFindAllProductsServiceResponse> {
        const allProducts = await this.productsRepository.findAllProducts(page);

        if (allProducts.length === 0) {
            throw new ResourceNotFoundError();
        }

        return { allProducts };
    }
}