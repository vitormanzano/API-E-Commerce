import { IProductsRepository } from "@/repositories/products-repository-interface";
import { verifyProductIsValid } from "./verifyProductIsValid";
import { IRegisterProductServiceRequest } from "./models/IRegisterProductServiceRequest";
import { IRegisterProductServiceResponse } from "./models/IRegisterProductServiceResponse";

export class RegisterProductService {
    constructor (private productsRepository: IProductsRepository) {}

    async execute(productData: IRegisterProductServiceRequest): Promise<IRegisterProductServiceResponse> {

        await verifyProductIsValid(productData);

        const product = await this.productsRepository.registerProduct(productData);

        return { product };
    }
}