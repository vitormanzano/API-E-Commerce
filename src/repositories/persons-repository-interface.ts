import { Prisma, Person } from "@prisma/client";
import { IFindNearbySeller } from "./models/IFindNearbySellers";

export interface IPersonsRepository {
    registerPerson(person: Prisma.PersonCreateInput): Promise<Person>
    findPersonByEmail(email: string): Promise<Person | null>
    deletePersonByGuid(guid: string): Promise<Person | undefined>
    findPersonByGuid(guid: string): Promise<Person | null>
    updatePersonByGuid(guid: string, person: Prisma.PersonUpdateInput): Promise<Person | null> 
    findNearbySellers({latitude, longitude}: IFindNearbySeller): Promise<Person[]>
}