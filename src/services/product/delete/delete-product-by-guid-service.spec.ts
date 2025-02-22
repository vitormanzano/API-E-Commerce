import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { randomUUID } from "crypto";
import { describe, beforeEach, it, expect } from "vitest";
import { DeleteProductByGuidService } from "./delete-product-by-guid-service";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

let productsRepository: IProductsRepository;
let personsRepository: IPersonsRepository;
let sut: DeleteProductByGuidService;

describe('Delete product by guid', () => {
    beforeEach(async () => {
        productsRepository = new InMemoryProductRepository();
        personsRepository = new InMemoryPersonRepository();
        sut = new DeleteProductByGuidService(productsRepository, personsRepository);
    });

    it('Should be able to delete a product', async () => {
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
        
        const registeredProduct = await productsRepository.registerProduct(productData);

        const { deletedProduct } = await sut.execute({
            personGuid: person.guid,
            productGuid: registeredProduct.guid
        });

        expect(deletedProduct.guid).toEqual(registeredProduct.guid);
    });

    it('Should not be able to delete a product if guid is incorrect', async () => {
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
        
        await productsRepository.registerProduct(productData);

        const newGuid = randomUUID();

        expect(() => sut.execute({
            personGuid: person.guid,
            productGuid: newGuid
        })). rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('Should not be able to delete a product if person dont have anyone product', async () => {
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
            sellerId: randomUUID() //Create a product but with a random guid!
        }
        
        const registeredProduct = await productsRepository.registerProduct(productData);

        expect(() => sut.execute({
            personGuid: person.guid,
            productGuid: registeredProduct.guid
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    });


})