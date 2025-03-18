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

        const person = await personsRepository.registerPerson(personData);

        const seller = await personsRepository.registerPerson(sellerData);

        const productData = {
            name: "Vitor",
            description: "Something",
            price: 8.99,
            quantity: 2,
            sellerId: seller.guid
        }
        
        await productsRepository.registerProduct(productData);
            
        const {nearbySellers} = await sut.execute(
            {
                personGuid: person.guid, 
            });
        
        expect(nearbySellers).toEqual([expect.objectContaining({ email: 'doejohn@gmail.com'})]);
    });

    it('Should not be able to get nearby sellers with they far than 20km', async () => {    
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.950341,
            longitude: -47.0554993 
        }

        const sellerDataClose = {
            guid: randomUUID(),
            name: 'Doe john',
            email: 'doejohnClose@gmail.com',
            password: '123457',
            latitude: -22.9497337,
            longitude: -47.0560172
        }
        const sellerDataFar = {
            guid: randomUUID(),
            name: 'Doe john',
            email: 'doejohnFar@gmail.com',
            password: '123457',
            latitude: -22.6954627,
            longitude: -47.0498513
        }

        const person = await personsRepository.registerPerson(personData);

        await personsRepository.registerPerson(sellerDataClose);

        await personsRepository.registerPerson(sellerDataFar);

        const { nearbySellers } = await sut.execute(
            {
                personGuid: person.guid, 
            });
            
        expect(nearbySellers).toHaveLength(1);
        expect(nearbySellers).toEqual([
            expect.objectContaining({ email: 'doejohnClose@gmail.com'})
        ]);
    })
})

