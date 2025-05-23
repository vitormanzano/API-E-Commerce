import { describe, it, beforeEach, expect } from "vitest";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { RegisterProductService } from "./register-product-service";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { randomUUID } from "crypto";

let productsRepository: IProductsRepository;
let personsRepository: IPersonsRepository;
let sut: RegisterProductService;

describe('Register product service', () => {
    beforeEach(async () => {
        productsRepository = new InMemoryProductRepository();
        personsRepository = new InMemoryPersonRepository();
        sut = new RegisterProductService(productsRepository);
    });

    it('Should be able to register a product', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }
        const person  = await personsRepository.registerPerson(personData);

        const productData = {
            name: "Vitor",
            description: "Something",
            price: 8.99,
            quantity: 2,
            sellerId: person.guid
        }
        
        const { product } = await sut.execute(productData);

        expect(product.guid).toEqual(expect.any(String));
    });

    it('Should not be able to register a product if quantity is fewer than 1', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const person  = await personsRepository.registerPerson(personData);

        const productData = {
            name: "Vitor",
            description: "Something",
            price: 8.99,
            quantity: 0,
            sellerId: person.guid
        }

        expect(() => sut.execute(productData)).rejects.toBeInstanceOf(Error);
    });

    it('Should not be able to register a product if price is fewer than 0', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const person  = await personsRepository.registerPerson(personData);

        const productData = {
            name: "Vitor",
            description: "Something",
            price: 0,
            quantity: 1,
            sellerId: person.guid
        }

        expect(() => sut.execute(productData)).rejects.toBeInstanceOf(Error);
    })
});