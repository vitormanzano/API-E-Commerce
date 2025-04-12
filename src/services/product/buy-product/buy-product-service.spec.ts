import { IProductsRepository } from "@/repositories/products-repository-interface";
import { BuyProductService } from "./buy-product-service";
import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product-repository";
import { randomUUID } from "crypto";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { OutOfStockError } from "@/errors/out-of-stock-error";

let productsRepository: IProductsRepository;
let personsRepository: IPersonsRepository;
let sut: BuyProductService;

describe('Buy a product', () => {
    beforeEach(async () => {
        productsRepository = new InMemoryProductRepository();
        personsRepository = new InMemoryPersonRepository();
        sut = new BuyProductService(productsRepository);
    });

    it('Should be able to buy a product', async () => {
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

        const quantity = 1;

        const { updatedProduct } = await sut.execute({
            productGuid: registeredProduct.guid,
            buyerGuid: person.guid,
            quantity
        });

        const quantityAfterBuy = 1;

        expect(updatedProduct?.quantity).toEqual(quantityAfterBuy)
    });

    it('Should not be able to buy a product if doesnt have the quantity', async () => {
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

        const quantity = 3;

        expect(() => sut.execute({
            productGuid: registeredProduct.guid,
            buyerGuid: person.guid,
            quantity
        })).rejects.toBeInstanceOf(OutOfStockError);
    }) 
})