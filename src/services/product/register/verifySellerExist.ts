import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { IRegisterProductServiceRequest } from "./register-product-service";

export const verifySellerExist = async (personsRepository: IPersonsRepository, productData: IRegisterProductServiceRequest ) => 
{
    const sellerData = await personsRepository.findPersonByEmail(productData.sellerId);
       
    if (!sellerData) {
        throw new ResourceNotFoundError();  
    }

    return sellerData;
}



