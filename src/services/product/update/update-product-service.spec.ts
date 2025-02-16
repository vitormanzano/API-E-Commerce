import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateProductService } from "./update-product-service";

let productsRepository: IProductsRepository;
let personsRepository: IPersonsRepository;
let sut: UpdateProductService;

describe('Update a product', () => {
    beforeEach(async () => {
        productsRepository = new InMemoryProductRepository();
        personsRepository = new InMemoryPersonRepository();
        sut = new UpdateProductService(productsRepository);
    });

    it('Should be able to update a product', async () => {
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
        
        const product = await productsRepository.registerProduct(productData);

        const productDataForUpdate = {
            name: "Vitor Updated",
            sellerId: person.guid
        }

        await sut.execute(product.guid, productDataForUpdate);

        expect(product.name).toEqual("Vitor Updated");
    });
})