import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { IFindProductsByNameServiceResponse } from "./models/IFindProductsByNameServiceResponse";
import { IFindProductsByNameServiceRequest } from "./models/IFindProductsByNameServiceRequest";

export class FindProductsByNameService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({name}: IFindProductsByNameServiceRequest): Promise<IFindProductsByNameServiceResponse> {
        const products = await this.productsRepository.findProductByName(name);

        if (!products) {
            throw new ResourceNotFoundError();
        }
        return { products };
    }
}