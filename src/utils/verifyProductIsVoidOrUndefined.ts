import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

export function verifyProductIsUndefinedOrVoid(product: any) {
    if (!product || product.length === 0 ) {
        throw new ResourceNotFoundError();
    }
}