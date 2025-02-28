import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IFindNearbySellersServiceRequest } from "./models/IFindNearbySellesServiceRequest";
import { IFindNearbySellersServiceResponse } from "./models/IFindNearbySellersServiceResponse";

export class FindNearbySellersService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute({personGuid}: IFindNearbySellersServiceRequest): Promise<IFindNearbySellersServiceResponse> {
        const person = await this.personsRepository.findPersonByGuid(personGuid);

        if (!person) {
            throw new Error();
        }

        const nearbySellers = await this.personsRepository.findNearbySellers({
            personGuid: person.guid,
            latitude: Number(person.latitude),
            longitude: Number(person.longitude)
        });

        return {nearbySellers};
    }
}