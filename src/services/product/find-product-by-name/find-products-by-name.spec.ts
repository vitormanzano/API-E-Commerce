import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { randomUUID } from "crypto";
import { beforeEach, describe, it, expect } from "vitest";
import { FindProductsByNameService } from "./find-products-by-name-service";

let productsRepository: IProductsRepository;
let personsRepository: IPersonsRepository;
let sut: FindProductsByNameService;

describe('Find products by name', () => {
    beforeEach( async () => {
        productsRepository = new InMemoryProductRepository();
        personsRepository = new InMemoryPersonRepository();
        sut = new FindProductsByNameService(productsRepository);
    });

    it('Should be able to find products by name', async () => {
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

        const nameForSearch= "Vitor";

        const { products } = await sut.execute({
            name: nameForSearch,
        });

        expect(products).toHaveLength(1);
    });

    it('Should not be able to find a product if name not exist', async () => {
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

        const nameForSearch= "Vito3r";

        const { products } = await sut.execute({
            name: nameForSearch,
        });

        expect(products).toHaveLength(0);
    });

    
})