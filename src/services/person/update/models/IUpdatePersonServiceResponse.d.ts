import { Person } from "@prisma/client";

export interface IUpdatePersonServiceResponse {
    updatedPerson: Person;
}
