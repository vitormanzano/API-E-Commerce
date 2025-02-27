import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { beforeEach, describe, expect, it } from "vitest";
import { GetOwnProductsService } from "./get-own-products-service";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { randomUUID } from "crypto";

let productsRepository: IProductsRepository;
let personsRepository: IPersonsRepository;
let sut: GetOwnProductsService;

describe('Get own products', () => {
    beforeEach(async () => {
        productsRepository = new InMemoryProductRepository();
        personsRepository = new InMemoryPersonRepository();
        sut = new GetOwnProductsService(productsRepository);
    });

    it('Should be able to get persons products', async () => {
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
    
        const { products } = await sut.execute({
            personGuid: person.guid,
            page: 1
        }); 
        
        expect(products).toHaveLength(2);
    });

    it('Should be able to paginate the own products', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const person = await personsRepository.registerPerson(personData);

        for (let i = 1; i <= 22; i++) {
            await productsRepository.registerProduct({
                name: `Vitor ${i}`,
                description: `Something ${i}`,
                price: 10.00,
                quantity: 1,
                sellerId: person.guid
            });
        }

        const { products } = await sut.execute({
            personGuid: person.guid,
            page: 2
        });

        expect(products).toHaveLength(2);
        expect(products).toEqual([
            expect.objectContaining({ name: 'Vitor 21'}),
            expect.objectContaining({ name: 'Vitor 22'})
        ]);
    });


})