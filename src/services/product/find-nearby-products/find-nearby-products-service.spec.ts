import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { FindNearbyProductsService } from "./find-nearby-products-service";
import { describe, it, beforeEach } from "vitest";
import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";

let personsRepository: IPersonsRepository;
let productsRepository: IProductsRepository
let sut: FindNearbyProductsService;

describe('Find nearby products', () => {
    beforeEach(async () => {
        personsRepository = new InMemoryPersonRepository();
        productsRepository = new InMemoryProductRepository();
        sut = new FindNearbyProductsService(personsRepository, productsRepository);  
    });

    it('Should be able to find nearby products', async () => {
        
    });
});