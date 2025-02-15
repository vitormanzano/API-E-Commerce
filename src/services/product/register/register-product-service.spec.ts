import { describe, it, beforeEach, expect } from "vitest";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { RegisterProductService } from "./register-product-service";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

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

        const productData = {
            name: "Vitor",
            description: "Something",
            price: 8.99,
            quantity: 2,
            sellerId: "johndoe@gmail.com"
        }

        await personsRepository.registerPerson(personData);
        
        const { product } = await sut.execute(productData);

        expect(product.guid).toEqual(expect.any(String));
    });

    // it('Should not be able to register any product if the seller doesnt exist', async () => {
    //     const personData = {
    //         guid: randomUUID(),
    //         name: 'John doe',
    //         email: 'johndoe@gmail.com',
    //         password: '123456',
    //         latitude: -22.9482175,
    //         longitude: -47.0652211 
    //     }

    //     const productData = {
    //         name: "Vitor",
    //         description: "Something",
    //         price: 8.99,
    //         quantity: 2,
    //         sellerId: "johndo@gmail.com" //email without e
    //     }

    //     await personsRepository.registerPerson(personData);

    //     await expect(() => sut.execute(productData)).rejects.toBeInstanceOf(ResourceNotFoundError);
    // });

    it('Should not be able to register any product if quantity is fewer than 1', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const productData = {
            name: "Vitor",
            description: "Something",
            price: 8.99,
            quantity: 0,
            sellerId: "johndoe@gmail.com"
        }

        expect(() => sut.execute(productData)).rejects.toBeInstanceOf(Error);
    });
});