import { verifyQuantityProduct } from "@/utils/verifyQuantityProduct";
import { IRegisterProductServiceRequest } from "./register-product-service";
import { verifyPriceProduct } from "@/utils/verifyPriceProduct";

export const verifyProductIsValid = async (productData: IRegisterProductServiceRequest) => {
    const quantityIsBiggerThanZero = await verifyQuantityProduct(productData.quantity);

    if (!quantityIsBiggerThanZero) {
        throw new Error('The quantity must be greater than 0.'); //Quantity needs to be bigger than 0
    }

    const priceIsBiggerThanZero = await verifyPriceProduct(productData.price);

    if (!priceIsBiggerThanZero) {
        throw new Error('The price must be more than 0.'); //Price needs to be bigger than 0
    }
}