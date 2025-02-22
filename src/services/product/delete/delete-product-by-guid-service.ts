import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { IDeleteProductByGuidServiceRequest } from "./models/IDeleteProductByGuidServiceRequest";
import { IDeleteProductByGuidServiceResponse } from "./models/IDeleteProductByGuidServiceResponse";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

export class DeleteProductByGuidService {
    constructor(private productsRepository: IProductsRepository,
                private personsRepository: IPersonsRepository
    ) {}

    async execute({personGuid, productGuid}: IDeleteProductByGuidServiceRequest): Promise<IDeleteProductByGuidServiceResponse> {
        const deletedProduct = await this.productsRepository.deleteProductByGuid(personGuid, productGuid);

        if (!deletedProduct ) {
            throw new ResourceNotFoundError();
        }

        return { deletedProduct }
    }
}