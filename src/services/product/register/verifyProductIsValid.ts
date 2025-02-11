import { IRegisterProductServiceRequest } from "./register-product-service";

export const verifyProductIsValid = async (productData: IRegisterProductServiceRequest) => {
    if (productData.quantity < 1) {
        throw new Error('The quantity must be greater than 0.'); //Quantity needs to be bigger than 0
    }

    if (productData.price <= 0 ) {
        throw new Error('The quantity must be more than 0.'); //Price needs to be bigger than 0
    }
}