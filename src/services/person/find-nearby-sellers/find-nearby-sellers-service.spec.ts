import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { describe, beforeEach, it, expect } from "vitest";
import { FindNearbySellersService } from "./find-nearby-sellers-service";
import { randomUUID } from "crypto";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";

let personsRepository: IPersonsRepository;
let productsRepository: IProductsRepository;
let sut: FindNearbySellersService;

describe('Find nearby sellers service', () => {
    beforeEach(async () => {
        personsRepository = new InMemoryPersonRepository();
        productsRepository = new InMemoryProductRepository();
        sut = new FindNearbySellersService(personsRepository);
    });

    it('Should be able to get nearby sellers', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.950341,
            longitude: -47.0554993 
        }

        const sellerData = {
            guid: randomUUID(),
            name: 'Doe john',
            email: 'doejohn@gmail.com',
            password: '123457',
            latitude: -22.9497337,
            longitude: -47.0560172
        }

        const seller = await personsRepository.registerPerson(sellerData);

        await personsRepository.registerPerson(personData);

        const productData = {
            name: "Vitor",
            description: "Something",
            price: 8.99,
            quantity: 2,
            sellerId: seller.guid
        }
        
        await productsRepository.registerProduct(productData);

        const nearbySellers = await sut.execute(personData.latitude, personData.longitude);
        
        expect(nearbySellers).toEqual([expect.objectContaining({ name: 'Doe john'})]);

    });
})

