import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { IGetOwnProductsServiceRequest } from "./models/IGetOwnProductsServiceRequest";
import { IGetOwnProductsServiceResponse } from "./models/IGetOwnProductsServiceResponse";
import { verifyProductIsUndefinedOrVoid } from "@/utils/verifyProductIsVoidOrUndefined";

export class GetOwnProductsService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({ personGuid, page }: IGetOwnProductsServiceRequest): Promise<IGetOwnProductsServiceResponse> {
        const products = await this.productsRepository.findProductsByPerson(personGuid, page);

        verifyProductIsUndefinedOrVoid(products)
        
        return  { products };
    }
}