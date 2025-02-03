import { Person } from "@prisma/client";
import { IUsersRepository } from "../../../repositories/users-repository-interface";
import { hash } from "bcryptjs";

export interface IRegisterUserServiceRequest {
    guid: string;
    name: string;
    email: string;
    password: string;
    latitude: number;
    longitude: number;
}

interface IRegisterUserServiceResponse {
    user: Person; 
}

export class RegisterUserService {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(userData: IRegisterUserServiceRequest): Promise<IRegisterUserServiceResponse> {
        const hashedPassword = await hash(userData.password, 6);
        userData.password = hashedPassword;

        const user = await this.usersRepository.registerUser(userData);

        return { user }; 
    }
}
