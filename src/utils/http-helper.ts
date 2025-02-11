import { PersonAlreadyExistsError } from "@/errors/person-already-exists-error";
import { HttpResponseModel } from "@/models/http-response-model";

export const ok = async (body: any): Promise<HttpResponseModel> => {
    return {
        statusCode: 200,
        body
    };
};

export const created = async (body: any): Promise<HttpResponseModel> => {
    return {
        statusCode: 201,
        body
    };
}

export const noContent = async(body: any): Promise<HttpResponseModel> => {
    return {
        statusCode: 204,
        body
    };
};

export const badRequest = async (body: any): Promise<HttpResponseModel> => {
    return {
        statusCode: 400,
        body
    };
};

export const notFound = async (body: any): Promise<HttpResponseModel> => {
    return {
        statusCode: 404,
        body
    };
};

export const serverError = async (error: Error): Promise<HttpResponseModel> => {
    return  {
        statusCode: 500,
        body: error
    }
}

export const conflict =  async (body: PersonAlreadyExistsError): Promise<HttpResponseModel> => {
    return {
        statusCode: 409,
        body
    }
}