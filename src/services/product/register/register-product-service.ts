import { Product, } from "@prisma/client";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { verifyProductIsValid } from "./verifyProductIsValid";

export interface IRegisterProductServiceRequest {
    name: string
    description: string
    price: number
    quantity: number
    sellerId: string
}

interface IRegisterProductServiceResponse {
    product: Product; 
}

export class RegisterProductService {
    constructor (private productsRepository: IProductsRepository) {}

    async execute(productData: IRegisterProductServiceRequest): Promise<IRegisterProductServiceResponse> {

        await verifyProductIsValid(productData);

        const product = await this.productsRepository.registerProduct(productData);

        return { product };
    }
}