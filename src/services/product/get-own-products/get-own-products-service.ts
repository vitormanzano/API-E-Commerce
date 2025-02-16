import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { Product } from "@prisma/client";

interface getOwnProductsServiceRequest {
    personGuid: string,
    page: number
}

export class GetOwnProductsService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({ personGuid, page }: getOwnProductsServiceRequest): Promise<Product[]> {
        const products = await this.productsRepository.findProductsByPerson(personGuid, page);

        if (!products) {
            throw new ResourceNotFoundError();
        }

        return products;
    }
}