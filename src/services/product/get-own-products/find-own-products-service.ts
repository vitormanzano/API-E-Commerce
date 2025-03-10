import { IProductsRepository } from "@/repositories/products-repository-interface";
import { IFindOwnProductsServiceRequest } from "./models/IGetOwnProductsServiceRequest";
import { IFindOwnProductsServiceResponse } from "./models/IGetOwnProductsServiceResponse";
import { verifyProductIsUndefinedOrVoid } from "@/utils/verifyProductIsVoidOrUndefined";

export class FindOwnProductsService {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({ personGuid, page }: IFindOwnProductsServiceRequest): Promise<IFindOwnProductsServiceResponse> {
        const products = await this.productsRepository.findProductsByPerson(personGuid, page);

        verifyProductIsUndefinedOrVoid(products)
        
        return  { products };
    }
}