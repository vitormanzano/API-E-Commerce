import { Person } from "./Person";
import { Product } from "./Product";

export class Buy {
    private guid: string = "";
    private product: Product;
    private productId: string;
    private person: Person;
    private personId: string;

    constructor(guid: string,
                product: Product,
                productId: string,
                person: Person,
                personId: string,) 
    {
        this.guid = guid;
        this.product = product;
        this.productId = productId;
        this.person = person;
        this.personId = personId;
    }

     



}