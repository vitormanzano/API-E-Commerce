import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IProductsRepository } from "@/repositories/products-repository-interface";
import { IFindNearbyProductsServiceResponse } from "./models/IFindNearbyProductsServiceResponse";

export class FindNearbyProductsService {
    constructor(private personsRepository: IPersonsRepository,
                private productsRepository: IProductsRepository
    ) {}

    async execute(personGuid: string): Promise<IFindNearbyProductsServiceResponse> {
        const person = await this.personsRepository.findPersonByGuid(personGuid);

        // if (!person) {
        //     throw new Error();
        // }

        const nearbySellers = await this.personsRepository.findNearbySellers({
            personGuid,
            latitude: Number(person!.latitude),
            longitude: Number(person!.longitude)
        });

        const page = 1;

        const nearbyProducts = (await Promise.all(nearbySellers.flatMap(person => 
            this.productsRepository.findProductsByPerson(person.guid, page)
        ))).flat();

        return { nearbyProducts } 
    }


}