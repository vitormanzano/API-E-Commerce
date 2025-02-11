import { Product, } from "@prisma/client";
import { IProductRepository } from "../../../repositories/products-repository-interface";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { verifySellerExist } from "./verifySellerExist";
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
    constructor (private productsRepository: IProductRepository,
                private personsRepository: IPersonsRepository ) {}

    async execute(productData: IRegisterProductServiceRequest): Promise<IRegisterProductServiceResponse> {
        const sellerExist = await verifySellerExist(this.personsRepository, productData); 

        verifyProductIsValid(productData);

        productData.sellerId = sellerExist.guid;

        const product = await this.productsRepository.registerProduct(productData);

        return { product };
    }
}