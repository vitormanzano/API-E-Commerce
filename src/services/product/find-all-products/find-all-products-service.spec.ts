import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { randomUUID } from "crypto";
import { describe, beforeEach, it, expect } from "vitest";
import { FindAllProductsService } from "./find-all-products-service";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

let productsRepository: IProductsRepository;
let personsRepository: IPersonsRepository;
let sut: FindAllProductsService;

describe('Find all products', () => {
    beforeEach(async () => {
        productsRepository = new InMemoryProductRepository();
        personsRepository = new InMemoryPersonRepository();
        sut = new FindAllProductsService(productsRepository);
    });

    it('Should be able to find all products', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const person = await personsRepository.registerPerson(personData);


        const productData = {
            name: "Vitor",
            description: "Something",
            price: 8.99,
            quantity: 2,
            sellerId: person.guid
        }
        
        await productsRepository.registerProduct(productData);

        const productData2 = {
            name: "Vitor2",
            description: "Something",
            price: 8.99,
            quantity: 2,
            sellerId: person.guid
        }
        
        await productsRepository.registerProduct(productData2);

        const page = 1

        const { allProducts } = await sut.execute({page});
    
        expect(allProducts).toHaveLength(2);
    });

    it('Should be able to paginate all products', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        await personsRepository.registerPerson(personData);


        const sellerData = {
                    guid: randomUUID(),
                    name: 'John doe',
                    email: 'johndoe@gmail.com',
                    password: '123456',
                    latitude: -22.9482175,
                    longitude: -47.0652211 
        }
        
        const seller = await personsRepository.registerPerson(sellerData);
        
        for (let i = 1; i <= 22; i++) {
            await productsRepository.registerProduct({
                name: `Vitor ${i}`,
                description: `Something ${i}`,
                price: 10.00,
                quantity: 1,
                sellerId: seller.guid
            });
        }

        const page = 2;

        const { allProducts } = await sut.execute({page})

        expect(allProducts).toHaveLength(2);
        expect(allProducts).toEqual([
            expect.objectContaining({ name: "Vitor 21" }),
            expect.objectContaining({ name: "Vitor 22" })
        ])
    })


    it('Should not be able to find products if not exist anyone product', async () => {
        const page = 1;
        await expect( () => sut.execute({page})).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

})