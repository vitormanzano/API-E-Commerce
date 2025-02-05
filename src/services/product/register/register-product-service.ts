import { Product, } from "@prisma/client";
import { IProductRepository } from "../../../repositories/products-repository-interface";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";

export interface IRegisterProductServiceRequest {
    guid?: string
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
                private personsRepository: IPersonsRepository 
    ) {}

    async execute(productData: IRegisterProductServiceRequest): Promise<IRegisterProductServiceResponse> {
        const sellerData = await this.personsRepository.findPersonByEmail(productData.sellerId);
       
        if (!sellerData) {
            throw new ResourceNotFoundError();  
        }

        if (productData.quantity < 1) {
            throw new Error('Quantidade precisa ser maior que 0!');
        }

        productData.sellerId = sellerData.guid;

        const product = await this.productsRepository.registerProduct(productData);

        return { product };
    }
}