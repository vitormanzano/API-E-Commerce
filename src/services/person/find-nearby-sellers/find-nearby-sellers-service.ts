import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IFindNearbySellersServiceRequest } from "./models/IFindNearbySellesServiceRequest";
import { IFindNearbySellersServiceResponse } from "./models/IFindNearbySellersServiceResponse";

export class FindNearbySellersService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(personData: IFindNearbySellersServiceRequest): Promise<IFindNearbySellersServiceResponse> {
        const nearbySellers = await this.personsRepository.findNearbySellers({
            personGuid: personData.personGuid,
            latitude: personData.latitude,
            longitude: personData.longitude
        });

        return {nearbySellers};
    }
}