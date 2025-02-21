import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { Person } from "@prisma/client";

export class FindNearbySellersService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(latitude: number, longitude: number): Promise<Person[]> {
        let persons = await this.personsRepository.findNearbySellers({
            latitude,
            longitude
        });

        return persons;
    }
}